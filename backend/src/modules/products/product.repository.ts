import prisma from "@/lib/prisma";

export class ProductRepository {
  async create(data: any) {
    return prisma.$transaction(
      async (tx) => {
        // Create product + variants
        const product = await tx.product.create({
          data,
          include: {
            variants: true,
          },
        });

        // Create all inventory logs in ONE database query
        if (product.variants.length > 0) {
          await tx.inventoryLog.createMany({
            data: product.variants.map((variant) => ({
              variantId: variant.id,
              change: variant.stock,
              previousStock: 0,
              newStock: variant.stock,
              reason: "INITIAL_STOCK",
              note: "Initial product stock",
            })),
          });
        }

        return product;
      },
      { maxWait: 10000, timeout: 20000 }
    );
  }

  async findCategory(
    categoryId: string,
    storeId: string
  ) {
    return prisma.category.findFirst({
      where: {
        id: categoryId,
        storeId,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.product.findFirst({
      where: {
        slug,
      },
    });
  }
async findAll(
  storeId: string,
  query: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    featured?: boolean;
    sort?: string;
  }
) {
  const page = query.page ?? 1;
  const limit = query.limit ?? 10;

  const where: any = {
    storeId,
  };

  if (query.search) {
    where.OR = [
      {
        name: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        brand: {
          contains: query.search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (query.status) {
    where.status = query.status;
  }

  if (query.featured !== undefined) {
    where.isFeatured = query.featured;
  }

  let orderBy: any = {
    createdAt: "desc",
  };

  switch (query.sort) {
    case "oldest":
      orderBy = {
        createdAt: "asc",
      };
      break;

    case "featured":
      orderBy = {
        isFeatured: "desc",
      };
      break;

    case "name":
      orderBy = {
        name: "asc",
      };
      break;
  }

  const [products, total] =
    await prisma.$transaction([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          images: true,
          variants: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy,
      }),

      prisma.product.count({
        where,
      }),
    ]);

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
async findById(
  productId: string,
  storeId: string
) {
  return prisma.product.findFirst({
    where: {
      id: productId,
      storeId,
    },

    include: {
      category: true,
      images: true,
      variants: true,
    },
  });
}

async update(
  productId: string,
  storeId: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    brand?: string;
    categoryId?: string;
    isFeatured?: boolean;
    images?: {
      url: string;
      publicId: string;
    }[];
    variants?: {
      id?: string;
      size: any;
      color?: string;
      price: number;
      stock: number;
      sku: string;
    }[];
  }
) {
  return prisma.$transaction(
    async (tx) => {
      // 1. Fetch existing product and variants
      const existing =
        await tx.product.findFirst({
          where: {
            id: productId,
            storeId,
          },
          include: {
            variants: true,
          },
        });

      if (!existing) {
        throw new Error(
          "Product not found."
        );
      }

      const {
        images,
        variants,
        categoryId,
        ...fields
      } = data;

      // 2. Update product details
      await tx.product.update({
        where: {
          id: productId,
        },

        data: {
          ...fields,

          ...(categoryId && {
            category: {
              connect: {
                id: categoryId,
              },
            },
          }),
        },
      });

      // 3. Replace product images
      if (images !== undefined) {
        await tx.productImage.deleteMany({
          where: {
            productId,
          },
        });

        if (images.length > 0) {
          await tx.productImage.createMany({
            data: images.map(
              (image, index) => ({
                url: image.url,
                publicId:
                  image.publicId,
                position: index,
                productId,
              })
            ),
          });
        }
      }

      // 4. Update variants
      if (variants !== undefined) {
        const existingMap =
          new Map(
            existing.variants.map(
              (variant) => [
                variant.id,
                variant,
              ]
            )
          );

        const incomingIds =
          variants
            .filter(
              (variant) =>
                variant.id
            )
            .map(
              (variant) =>
                variant.id!
            );

        // Delete removed variants
        const idsToDelete =
          existing.variants
            .filter(
              (variant) =>
                !incomingIds.includes(
                  variant.id
                )
            )
            .map(
              (variant) =>
                variant.id
            );

        if (
          idsToDelete.length > 0
        ) {
          await tx.productVariant.deleteMany({
            where: {
              id: {
                in: idsToDelete,
              },
            },
          });
        }

        // Collect inventory logs
        const inventoryLogs: {
          variantId: string;
          change: number;
          previousStock: number;
          newStock: number;
          reason:
            | "MANUAL_ADJUSTMENT"
            | "INITIAL_STOCK";
          note: string;
        }[] = [];

        for (
          const variant of variants
        ) {
          // Existing variant
          if (
            variant.id &&
            existingMap.has(
              variant.id
            )
          ) {
            const previous =
              existingMap.get(
                variant.id
              )!;

            const previousStock =
              Number(
                previous.stock
              );

            const newStock =
              Number(
                variant.stock
              );

            await tx.productVariant.update({
              where: {
                id: variant.id,
              },

              data: {
                size:
                  variant.size,

                color:
                  variant.color,

                price:
                  variant.price,

                stock:
                  newStock,

                sku:
                  variant.sku,
              },
            });

            if (
              newStock !==
              previousStock
            ) {
              inventoryLogs.push({
                variantId:
                  variant.id,

                change:
                  newStock -
                  previousStock,

                previousStock,

                newStock,

                reason:
                  "MANUAL_ADJUSTMENT",

                note:
                  "Stock updated via product edit",
              });
            }
          } else {
            // New variant
            const created =
              await tx.productVariant.create({
                data: {
                  size:
                    variant.size,

                  color:
                    variant.color,

                  price:
                    variant.price,

                  stock:
                    variant.stock,

                  sku:
                    variant.sku,

                  productId,
                },
              });

            inventoryLogs.push({
              variantId:
                created.id,

              change:
                created.stock,

              previousStock: 0,

              newStock:
                created.stock,

              reason:
                "INITIAL_STOCK",

              note:
                "New variant added via product edit",
            });
          }
        }

        // Create inventory logs in ONE query
        if (
          inventoryLogs.length > 0
        ) {
          await tx.inventoryLog.createMany({
            data: inventoryLogs,
          });
        }
      }

      // 5. Return updated product
      return tx.product.findFirst({
        where: {
          id: productId,
          storeId,
        },

        include: {
          category: true,
          images: true,
          variants: true,
        },
      });
    },

    // Interactive transaction settings
    {
      maxWait: 10000,
      timeout: 20000,
    }
  );
}
}