import prisma from "@/lib/prisma";

export class StorefrontRepository {
  async findCategories(storeId: string) {
    const categories = await prisma.category.findMany({
      where: {
        storeId,
        isActive: true,
        products: { some: { status: "ACTIVE" } },
      },
      orderBy: { name: "asc" },
      include: {
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

  async findCategoryBySlug(storeId: string, slug: string) {
    return prisma.category.findFirst({
      where: { storeId, slug, isActive: true },
    });
  }

  async findProducts(
    storeId: string,
    query: {
      page?: number;
      limit?: number;
      search?: string;
      categorySlug?: string;
      featured?: boolean;
      sort?: string;
    }
  ) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 12;

    const where: any = {
      storeId,
      status: "ACTIVE",
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

  async findProductBySlug(storeId: string, slug: string) {
    return prisma.product.findFirst({
      where: { storeId, slug, status: "ACTIVE" },
      include: {
        category: true,
        images: { orderBy: { position: "asc" } },
        variants: true,
      },
    });
  }
}
