import { InventoryRepository } from "./inventory.repository";

export class InventoryService {
  private repository = new InventoryRepository();

  async getLogs(storeId: string, query: any) {
    return this.repository.findLogs(storeId, {
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 20,
      productId: query.productId,
      reason: query.reason,
    });
  }

  async getLowStock(storeId: string, threshold: number) {
    return this.repository.findLowStock(storeId, threshold);
  }

  async adjustStock(
    variantId: string,
    storeId: string,
    data: { change: number; note?: string }
  ) {
    const variant = await this.repository.findVariant(variantId, storeId);

    if (!variant) {
      throw new Error("Product variant not found.");
    }

    const previousStock = variant.stock;
    const newStock = previousStock + data.change;

    if (newStock < 0) {
      throw new Error("Stock cannot go below zero.");
    }

    const reason = data.change >= 0 ? "RESTOCK" : "MANUAL_ADJUSTMENT";

    return this.repository.adjustStock(
      variantId,
      data.change,
      previousStock,
      newStock,
      reason,
      data.note
    );
  }
}
