const LOGO_URL = `${process.env.CLIENT_URL}/logo-header.png`;

export function renderBrandedEmail(options: {
  heading: string;
  bodyHtml: string;
  ctaText: string;
  ctaUrl: string;
}) {
  const { heading, bodyHtml, ctaText, ctaUrl } = options;

  return `
  <div style="background:#F5E7C8;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #C9A22740;">
      <div style="background:linear-gradient(135deg,#2B0A12,#7A2436);padding:28px;text-align:center;">
        <img src="${LOGO_URL}" alt="SandroNepal" style="height:36px;" />
      </div>
      <div style="padding:32px 28px;">
        <h1 style="margin:0 0 16px;font-size:20px;color:#2B0A12;">${heading}</h1>
        <div style="font-size:15px;line-height:1.6;color:#444;">${bodyHtml}</div>
        <div style="text-align:center;margin-top:28px;">
          <a href="${ctaUrl}" style="display:inline-block;background:linear-gradient(135deg,#2B0A12,#7A2436);color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:bold;font-size:14px;">
            ${ctaText}
          </a>
        </div>
      </div>
      <div style="padding:16px 28px;text-align:center;font-size:12px;color:#999;border-top:1px solid #eee;">
        SandroNepal — Fashion for Every You
      </div>
    </div>
  </div>`;
}
