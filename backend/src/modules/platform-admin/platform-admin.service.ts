import { PlatformAdminRepository } from "./platform-admin.repository";
import { sendMail } from "@/utils/mailer";
import { renderBrandedEmail } from "@/utils/emailTemplates";

export class PlatformAdminService {
  private repository = new PlatformAdminRepository();

  login(email: string, password: string) {
    if (
      email !== process.env.PLATFORM_ADMIN_EMAIL ||
      password !== process.env.PLATFORM_ADMIN_PASSWORD
    ) {
      throw new Error("Invalid email or password.");
    }

    return this.me();
  }

  me() {
    return {
      name: process.env.PLATFORM_ADMIN_NAME,
      email: process.env.PLATFORM_ADMIN_EMAIL,
    };
  }

  async getPendingStores() {
    return this.repository.findPendingStores();
  }

  async approveStore(id: string) {
    const store = await this.repository.setStoreStatus(id, "APPROVED");
    const owner = store.users[0];

    if (owner?.email) {
      try {
        await sendMail({
          to: owner.email,
          subject: "Your SandroNepal store has been approved",
          html: renderBrandedEmail({
            heading: `Congratulations, ${owner.name}!`,
            bodyHtml: `
              <p><strong>${store.name}</strong> has been reviewed and approved on SandroNepal.</p>
              <p>Your storefront is now live and ready to take orders. Log in to your dashboard to add products, set up your payment QR, and start selling.</p>
            `,
            ctaText: "Log in to your dashboard",
            ctaUrl: `${process.env.CLIENT_URL}/login`,
          }),
        });
      } catch (error) {
        console.error("Failed to send store-approved email:", error);
      }
    }

    return store;
  }

  async rejectStore(id: string) {
    const store = await this.repository.setStoreStatus(id, "REJECTED");
    const owner = store.users[0];

    if (owner?.email) {
      try {
        await sendMail({
          to: owner.email,
          subject: "Update on your SandroNepal store application",
          html: renderBrandedEmail({
            heading: `Sorry, ${owner.name}`,
            bodyHtml: `
              <p>We reviewed <strong>${store.name}</strong> and aren't able to approve it on SandroNepal at this time.</p>
              <p>This isn't necessarily final — you're welcome to review your details and submit a new application.</p>
            `,
            ctaText: "Try again",
            ctaUrl: `${process.env.CLIENT_URL}/signup`,
          }),
        });
      } catch (error) {
        console.error("Failed to send store-rejected email:", error);
      }
    }

    return store;
  }

  async getAllStores() {
    return this.repository.findAllStores();
  }

  // Same as the store owner's own self-service "Delete Store" (settings
  // module) — a soft delete. A hard delete isn't safe here either: Order and
  // Product rows are RESTRICT-constrained against Store, so any store that's
  // ever taken an order can't be removed outright.
  async deleteStore(id: string) {
    return this.repository.setStoreActive(id, false);
  }

  async reactivateStore(id: string) {
    return this.repository.setStoreActive(id, true);
  }

  async getStats() {
    const [stores, totalOrders, totalCustomers, totalGmv, topStores] =
      await Promise.all([
        this.repository.countStoresByStatus(),
        this.repository.countOrders(),
        this.repository.countCustomers(),
        this.repository.sumGmv(),
        this.repository.topStoresByRevenue(),
      ]);

    return { stores, totalOrders, totalCustomers, totalGmv, topStores };
  }
}
