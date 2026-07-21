import prisma from "@/lib/prisma";
import { CategorySection } from "@prisma/client";

export class CategoryRepository {
  async create(data: {
    name: string;
    slug: string;
    storeId: string;
    section?: CategorySection;
    imageUrl?: string;
    publicId?: string;
  }) {
    return prisma.category.create({
      data,
    });
  }

  async findAll(storeId: string) {
    return prisma.category.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string, storeId: string) {
    return prisma.category.findFirst({
      where: {
        id,
        storeId,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.category.findUnique({
      where: {
        slug,
      },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      slug?: string;
      isActive?: boolean;
      section?: CategorySection;
      imageUrl?: string;
      publicId?: string;
    }
  ) {
    return prisma.category.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.category.delete({
      where: {
        id,
      },
    });
  }
}