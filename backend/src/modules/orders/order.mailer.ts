import { sendOrderMail } from "@/utils/mailer";
import { renderBrandedEmail } from "@/utils/emailTemplates";

interface OrderWithRelations {
  id: string;
  orderNumber: string;
  total: any;
  items: {
    productName: string;
    size: string | null;
    color: string | null;
    quantity: number;
    subtotal: any;
  }[];
  address: {
    fullName: string;
    phone: string;
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    pincode: string;
  };
  customer: { name: string; phone: string; email: string | null };
  store: { name: string; email: string };
}

function buildItemsTable(items: OrderWithRelations["items"]) {
  const rows = items
    .map((item) => {
      const variant = [item.size, item.color].filter(Boolean).join(", ");
      return `
      <tr style="border-bottom:1px solid #f2f2f2;">
        <td style="padding:8px 0;">${item.productName}${
        variant ? ` <span style="color:#999;">(${variant})</span>` : ""
      }</td>
        <td style="padding:8px 0;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 0;text-align:right;">₹${Number(item.subtotal).toLocaleString("en-IN")}</td>
      </tr>`;
    })
    .join("");

  return `
  <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
    <thead>
      <tr style="border-bottom:1px solid #eee;text-align:left;color:#888;font-size:12px;">
        <th style="padding:6px 0;">Item</th>
        <th style="padding:6px 0;text-align:center;">Qty</th>
        <th style="padding:6px 0;text-align:right;">Price</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function buildAddressBlock(address: OrderWithRelations["address"]) {
  return `
  <div style="margin-top:8px;padding:14px;background:#F9F4E8;border-radius:8px;">
    <p style="margin:0 0 6px;font-weight:bold;color:#2B0A12;">Delivery Address</p>
    <p style="margin:0;color:#555;">${address.fullName} — ${address.phone}</p>
    <p style="margin:0;color:#555;">${address.line1}${
    address.line2 ? `, ${address.line2}` : ""
  }, ${address.city}, ${address.state} ${address.pincode}</p>
  </div>`;
}

export async function sendOrderConfirmationEmail(order: OrderWithRelations) {
  if (!order.customer.email) return;

  await sendOrderMail({
    to: order.customer.email,
    subject: `Order confirmed — #${order.orderNumber}`,
    html: renderBrandedEmail({
      heading: `Thank you, ${order.customer.name}!`,
      bodyHtml: `
        <p>Your order from <strong>${order.store.name}</strong> has been placed successfully.</p>
        <p style="color:#888;font-size:13px;">Order #${order.orderNumber}</p>
        ${buildItemsTable(order.items)}
        <p style="text-align:right;font-size:16px;font-weight:bold;color:#2B0A12;">
          Total: ₹${Number(order.total).toLocaleString("en-IN")}
        </p>
        ${buildAddressBlock(order.address)}
        <p style="margin-top:16px;">We're verifying your payment and will confirm your order shortly.</p>
      `,
      ctaText: "View your order",
      ctaUrl: `${process.env.CLIENT_URL}/shop/account/orders/${order.id}`,
    }),
  });
}

export async function sendOrderReceivedEmail(order: OrderWithRelations) {
  await sendOrderMail({
    to: order.store.email,
    subject: `New order received — #${order.orderNumber}`,
    html: renderBrandedEmail({
      heading: "You've got a new order!",
      bodyHtml: `
        <p>Order #${order.orderNumber} was just placed on SandroNepal.</p>
        <div style="margin:16px 0;padding:14px;background:#F9F4E8;border-radius:8px;">
          <p style="margin:0 0 6px;font-weight:bold;color:#2B0A12;">Customer</p>
          <p style="margin:0;color:#555;">${order.customer.name} — ${order.customer.phone}</p>
        </div>
        ${buildItemsTable(order.items)}
        <p style="text-align:right;font-size:16px;font-weight:bold;color:#2B0A12;">
          Total: ₹${Number(order.total).toLocaleString("en-IN")}
        </p>
        ${buildAddressBlock(order.address)}
        <p style="margin-top:16px;">Review the payment proof and confirm the order from your dashboard.</p>
      `,
      ctaText: "View order in dashboard",
      ctaUrl: `${process.env.CLIENT_URL}/orders/${order.id}`,
    }),
  });
}
