import { ProductRepository } from "./product.repository";
import { CreateProductDto, UpdateProductDto } from "./product.types";
import { generateSlug } from "@/utils/slug";
import { generateSKU } from "@/utils/sku";

export class ProductService {
  private repository = new ProductRepository();

  async create(
    data: CreateProductDto,
    storeId: string
  ) {
    const category =
      await this.repository.findCategory(
        data.categoryId,
        storeId
      );

    if (!category) {
      throw new Error("Category not found.");
    }

    const slug = generateSlug(data.name);

    const existing =
      await this.repository.findBySlug(slug);

    if (existing) {
      throw new Error("Product already exists.");
    }

    return this.repository.create({
      name: data.name,

      slug,

      description: data.description,

      brand: data.brand,

      status: "ACTIVE",

      isFeatured: data.isFeatured ?? false,

      category: {
        connect: {
          id: data.categoryId,
        },
      },

      store: {
        connect: {
          id: storeId,
        },
      },

      images: {
        create: (data.images ?? []).map(
          (image, index) => ({
            url: image.url,
            publicId: image.publicId,
            position: index,
          })
        ),
      },

      variants: {
        create: data.variants.map((variant) => ({
          size: variant.size,

          color: variant.color,

          stock: variant.stock,

          price: variant.price,

          sku: generateSKU(
            data.name,
            variant.size,
            variant.color
          ),
        })),
      },
    });
  }
 async getAll(
  storeId: string,
  query: any
) {
  return this.repository.findAll(
    storeId,
    {
      page: query.page
        ? Number(query.page)
        : 1,

      limit: query.limit
        ? Number(query.limit)
        : 10,

      search: query.search,

      status: query.status,

      featured:
        query.featured === undefined
          ? undefined
          : query.featured === "true",

      sort: query.sort,
    }
  );
}
async getById(
  productId: string,
  storeId: string
) {
  const product = await this.repository.findById(productId, storeId);
  if (!product) throw new Error("Product not found.");
  return product;
}

async update(
  productId: string,
  storeId: string,
  data: UpdateProductDto
) {
  const existing = await this.repository.findById(productId, storeId);
  if (!existing) throw new Error("Product not found.");

  const slug = data.name ? generateSlug(data.name) : undefined;

  return this.repository.update(productId, storeId, {
    ...(data.name && { name: data.name }),
    ...(slug && { slug }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.brand !== undefined && { brand: data.brand }),
    ...(data.categoryId && { categoryId: data.categoryId }),
    ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
    ...(data.images !== undefined && { images: data.images }),
    ...(data.variants && {
      variants: data.variants.map((v) => ({
        id: v.id,
        size: v.size,
        color: v.color,
        price: v.price,
        stock: v.stock,
        sku: generateSKU(data.name ?? existing.name, v.size, v.color),
      })),
    }),
  });
}
}