import prisma from "@/lib/prisma";
import { UpdateStoreDto } from "./settings.types";

export class SettingsRepository {
  async findById(storeId: string) {
    return prisma.store.findUnique({ where: { id: storeId } });
  }

  async update(storeId: string, data: UpdateStoreDto) {
    return prisma.store.update({ where: { id: storeId }, data });
  }

  async deactivate(storeId: string) {
    return prisma.store.update({ where: { id: storeId }, data: { isActive: false } });
  }
}
