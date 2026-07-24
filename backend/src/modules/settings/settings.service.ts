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
      ...(data.paymentQrUrl && { paymentQrUrl: data.paymentQrUrl }),
      ...(data.paymentQrPublicId && { paymentQrPublicId: data.paymentQrPublicId }),
      ...(data.promoEnabled !== undefined && { promoEnabled: data.promoEnabled }),
      ...(data.promoBadgeText && { promoBadgeText: data.promoBadgeText }),
      ...(data.promoTitle && { promoTitle: data.promoTitle }),
      ...(data.promoDescription && { promoDescription: data.promoDescription }),
      ...(data.promoStartsAt && { promoStartsAt: new Date(data.promoStartsAt) }),
      ...(data.promoEndsAt && { promoEndsAt: new Date(data.promoEndsAt) }),
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
