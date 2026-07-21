import { CategoryRepository } from "./category.repository";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.types";
import { generateSlug } from "@/utils/slug";

export class CategoryService {
  private repository = new CategoryRepository();

  async create(
    data: CreateCategoryDto,
    storeId: string
  ) {
    const slug = generateSlug(data.name);

    const existing =
      await this.repository.findBySlug(slug);

    if (existing) {
      throw new Error("Category already exists.");
    }

    return this.repository.create({
      name: data.name,
      slug,
      storeId,
      section: data.section,
      imageUrl: data.imageUrl,
      publicId: data.publicId,
    });
  }

  async getAll(storeId: string) {
    return this.repository.findAll(storeId);
  }

  async update(id: string, storeId: string, data: UpdateCategoryDto) {
    const existing = await this.repository.findById(id, storeId);

    if (!existing) {
      throw new Error("Category not found.");
    }

    let slug: string | undefined;

    if (data.name && data.name !== existing.name) {
      slug = generateSlug(data.name);
      const slugOwner = await this.repository.findBySlug(slug);

      if (slugOwner && slugOwner.id !== id) {
        throw new Error("Category already exists.");
      }
    }

    return this.repository.update(id, {
      ...(data.name && { name: data.name }),
      ...(slug && { slug }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
      ...(data.section && { section: data.section }),
      ...(data.imageUrl && { imageUrl: data.imageUrl }),
      ...(data.publicId && { publicId: data.publicId }),
    });
  }

  async delete(id: string, storeId: string) {
    const existing = await this.repository.findById(id, storeId);

    if (!existing) {
      throw new Error("Category not found.");
    }

    return this.repository.delete(id);
  }
}