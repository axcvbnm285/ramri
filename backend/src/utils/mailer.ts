import { Resend } from "resend";

// Render blocks outbound SMTP (ports 25/465/587) at the network level, so
// raw nodemailer/Gmail SMTP times out in production even though it works
// locally. Resend sends over HTTPS instead, which is never blocked.
const resend = new Resend(process.env.RESEND_API_KEY);

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

async function send(from: string, options: MailOptions) {
  const { error } = await resend.emails.send({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text ?? toPlainText(options.html),
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}

// Store-approval flow: new-signup notification to the platform admin, and
// approved/rejected decisions to the store owner.
export async function sendMail(options: MailOptions) {
  return send("SandroNepal <notifications@sandronepal.shop>", options);
}

// Order flow: confirmation to the customer, "order received" to the store
// owner. Deliberately a separate sender identity from sendMail above.
export async function sendOrderMail(options: MailOptions) {
  return send("SandroNepal <orders@sandronepal.shop>", options);
}
