import { OrderRepository } from "./order.repository";
import { PlaceOrderDto, UpdateOrderStatusDto } from "./order.types";

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  PENDING: ["CONFIRMED"],
  CONFIRMED: ["DISPATCHED"],
};

export class OrderService {
  private repository = new OrderRepository();

  async placeOrder(customerId: string, data: PlaceOrderDto) {
    if (!data.items || data.items.length === 0) {
      throw new Error("Your cart is empty.");
    }

    const address = await this.repository.findAddress(data.addressId, customerId);

    if (!address) {
      throw new Error("Delivery address not found.");
    }

    return this.repository.placeOrder(customerId, data.addressId, data.items, data.notes);
  }

  async getAllForStore(storeId: string, query: any) {
    return this.repository.findAll(storeId, {
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 10,
      status: query.status,
      search: query.search,
    });
  }

  async getByIdForStore(id: string, storeId: string) {
    const order = await this.repository.findById(id, storeId);
    if (!order) throw new Error("Order not found.");
    return order;
  }

  async getMine(customerId: string) {
    return this.repository.findMine(customerId);
  }

  async getMineDetail(id: string, customerId: string) {
    const order = await this.repository.findMineDetail(id, customerId);
    if (!order) throw new Error("Order not found.");
    return order;
  }

  async updateStatus(id: string, storeId: string, data: UpdateOrderStatusDto) {
    const order = await this.repository.findById(id, storeId);
    if (!order) throw new Error("Order not found.");

    if (!ALLOWED_TRANSITIONS[order.status]?.includes(data.status)) {
      throw new Error(`Cannot move an order from ${order.status} to ${data.status}.`);
    }

    const updateData: Record<string, unknown> = { status: data.status };

    if (data.status === "DISPATCHED") {
      updateData.dispatchedAt = new Date();
      if (data.courierName) updateData.courierName = data.courierName;
      if (data.trackingId) updateData.trackingId = data.trackingId;
      if (data.trackingUrl) updateData.trackingUrl = data.trackingUrl;
    }

    return this.repository.updateStatusWithLog(
      id,
      updateData,
      data.status,
      "ADMIN",
      data.note
    );
  }

  async cancel(id: string, storeId: string) {
    const order = await this.repository.findById(id, storeId);
    if (!order) throw new Error("Order not found.");

    if (order.status !== "PENDING" && order.status !== "CONFIRMED") {
      throw new Error("Only pending or confirmed orders can be cancelled.");
    }

    return this.repository.cancelOrder(id);
  }

  async markReceivedByCustomer(id: string, customerId: string) {
    const order = await this.repository.findMineDetail(id, customerId);
    if (!order) throw new Error("Order not found.");

    if (order.status !== "DISPATCHED") {
      throw new Error("Only dispatched orders can be marked as received.");
    }

    return this.repository.markReceived(id, "CUSTOMER");
  }

  async markReceivedByAdmin(id: string, storeId: string) {
    const order = await this.repository.findById(id, storeId);
    if (!order) throw new Error("Order not found.");

    if (order.status !== "DISPATCHED") {
      throw new Error("Only dispatched orders can be marked as received.");
    }

    return this.repository.markReceived(id, "ADMIN");
  }
}
