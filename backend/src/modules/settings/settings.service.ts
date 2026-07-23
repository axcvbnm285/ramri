import { SettingsRepository } from "./settings.repository";
import { UpdateStoreDto } from "./settings.types";

export class SettingsService {
  private repository = new SettingsRepository();

  async getStore(storeId: string) {
    const store = await this.repository.findById(storeId);

    if (!store) {
      throw new Error("Store not found.");
    }

    return store;
  }

  async updateStore(storeId: string, data: UpdateStoreDto) {
    return this.repository.update(storeId, {
      ...(data.name && { name: data.name }),
      ...(data.logo && { logo: data.logo }),
      ...(data.logoPublicId && { logoPublicId: data.logoPublicId }),
    });
  }

  // A hard delete isn't safe here: Product/Order rows are RESTRICT-constrained
  // against Store, so any store that has ever taken an order can't be removed
  // outright. Deactivating hides it from the storefront and blocks admin
  // login while preserving the data for support-assisted recovery.
  async deactivateStore(storeId: string) {
    return this.repository.deactivate(storeId);
  }
}
