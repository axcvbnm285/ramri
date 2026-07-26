import nodemailer from "nodemailer";

const adminTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const ordersTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ORDERS_GMAIL_USER,
    pass: process.env.ORDERS_GMAIL_APP_PASSWORD,
  },
});

function toPlainText(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

interface MailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

async function send(
  transporter: nodemailer.Transporter,
  fromUser: string | undefined,
  options: MailOptions
) {
  await transporter.sendMail({
    ...options,
    from: `SandroNepal <${fromUser}>`,
    text: options.text ?? toPlainText(options.html),
  });
}

// Store-approval flow: new-signup notification to the platform admin, and
// approved/rejected decisions to the store owner.
export async function sendMail(options: MailOptions) {
  return send(adminTransporter, process.env.GMAIL_USER, options);
}

// Order flow: confirmation to the customer, "order received" to the store
// owner. Deliberately a separate Gmail account from sendMail above.
export async function sendOrderMail(options: MailOptions) {
  return send(ordersTransporter, process.env.ORDERS_GMAIL_USER, options);
}
