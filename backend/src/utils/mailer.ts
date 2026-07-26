import nodemailer from "nodemailer";

// Nodemailer's defaults (up to a 10-minute socket timeout) let a stuck SMTP
// connection hang far longer than useful, even fire-and-forget in the
// background — cap all three so a dead connection fails fast and logs.
const TIMEOUTS = {
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 10_000,
};

const adminTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  ...TIMEOUTS,
});

const ordersTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ORDERS_GMAIL_USER,
    pass: process.env.ORDERS_GMAIL_APP_PASSWORD,
  },
  ...TIMEOUTS,
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
