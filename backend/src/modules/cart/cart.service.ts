import { CartRepository } from "./cart.repository";
import { AddCartItemDto } from "./cart.types";

function toCartItem(row: {
  variantId: string;
  quantity: number;
  variant: {
    size: string | null;
    color: string | null;
    price: unknown;
    stock: number;
    product: {
      slug: string;
      name: string;
      images: { url: string }[];
      store: { id: string; name: string; paymentQrUrl: string | null };
    };
  };
}) {
  return {
    variantId: row.variantId,
    productSlug: row.variant.product.slug,
    productName: row.variant.product.name,
    image: row.variant.product.images[0]?.url,
    size: row.variant.size,
    color: row.variant.color,
    price: Number(row.variant.price),
    quantity: row.quantity,
    stock: row.variant.stock,
    storeId: row.variant.product.store.id,
    storeName: row.variant.product.store.name,
    storeQrUrl: row.variant.product.store.paymentQrUrl,
  };
}

export class CartService {
  private repository = new CartRepository();

  async getCart(customerId: string) {
    const rows = await this.repository.findAll(customerId);
    return rows.map(toCartItem);
  }

  async addItem(customerId: string, data: AddCartItemDto) {
    const variant = await this.repository.findVariant(data.variantId);

    if (!variant) {
      throw new Error("Product variant not found.");
    }

    let row = await this.repository.upsertAdd(customerId, data.variantId, data.quantity);

    if (row.quantity > variant.stock) {
      row = await this.repository.setQuantity(customerId, data.variantId, variant.stock);
    }

    return toCartItem(row);
  }

  async updateItem(customerId: string, variantId: string, quantity: number) {
    if (quantity <= 0) {
      await this.repository.remove(customerId, variantId);
      return null;
    }

    const existing = await this.repository.findOne(customerId, variantId);

    if (!existing) {
      throw new Error("Cart item not found.");
    }

    const variant = await this.repository.findVariant(variantId);

    if (!variant) {
      throw new Error("Product variant not found.");
    }

    const row = await this.repository.setQuantity(
      customerId,
      variantId,
      Math.min(quantity, variant.stock)
    );

    return toCartItem(row);
  }

  async removeItem(customerId: string, variantId: string) {
    await this.repository.remove(customerId, variantId);
  }

  async clearCart(customerId: string) {
    await this.repository.clear(customerId);
  }
}
