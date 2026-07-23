import prisma from "@/lib/prisma";

const STORE_SELECT = { select: { id: true, name: true } };

export class StorefrontRepository {
  async findCategories() {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
        store: { isActive: true },
        products: { some: { status: "ACTIVE" } },
      },
      orderBy: { name: "asc" },
      include: {
        store: STORE_SELECT,
        products: {
          where: { status: "ACTIVE" },
          orderBy: { createdAt: "asc" },
          take: 1,
          include: {
            images: { orderBy: { position: "asc" }, take: 1 },
          },
        },
      },
    });

    return categories.map(({ products, ...category }) => ({
      ...category,
      imageUrl: category.imageUrl ?? products[0]?.images[0]?.url ?? null,
    }));
  }

  async findCategoryBySlug(slug: string) {
    return prisma.category.findFirst({
      where: { slug, isActive: true, store: { isActive: true } },
      include: { store: STORE_SELECT },
    });
  }

  async findProducts(query: {
    page?: number;
    limit?: number;
    search?: string;
    categorySlug?: string;
    featured?: boolean;
    sort?: string;
  }) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 12;

    const where: any = {
      status: "ACTIVE",
      store: { isActive: true },
    };

    if (query.categorySlug) {
      where.category = { slug: query.categorySlug };
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { brand: { contains: query.search, mode: "insensitive" } },
      ];
    }

    if (query.featured !== undefined) {
      where.isFeatured = query.featured;
    }

    let orderBy: any = { createdAt: "desc" };

    switch (query.sort) {
      case "featured":
        orderBy = { isFeatured: "desc" };
        break;
      case "name":
        orderBy = { name: "asc" };
        break;
    }

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          store: STORE_SELECT,
          images: { orderBy: { position: "asc" } },
          variants: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy,
      }),
      prisma.product.count({ where }),
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

  async findProductBySlug(slug: string) {
    return prisma.product.findFirst({
      where: { slug, status: "ACTIVE", store: { isActive: true } },
      include: {
        category: true,
        store: STORE_SELECT,
        images: { orderBy: { position: "asc" } },
        variants: true,
      },
    });
  }
}
