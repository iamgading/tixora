import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTicketEmail({
  to,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  attendeeName,
  qrCode,
  ticketUrl,
}: {
  to: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string | null;
  eventLocation: string | null;
  attendeeName: string;
  qrCode: string;
  ticketUrl: string;
}) {
  // Skip if no API key configured
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key_here") {
    console.log("Resend API key not configured, skipping email");
    return { success: true, skipped: true };
  }

  const formattedDate = new Date(eventDate).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  
  // Format time without seconds (HH:MM only)
  const formattedTime = eventTime ? `${eventTime.split(':').slice(0, 2).join(':')} WIB` : null;

  try {
    const { data, error } = await resend.emails.send({
      from: "Tixora <noreply@resend.dev>",
      to: [to],
      subject: `Tiket Kamu untuk ${eventTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #0d9488; font-size: 28px; margin: 0;">Tixora</h1>
            </div>
            
            <!-- Main Card -->
            <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <!-- Success Banner -->
              <div style="background: #0d9488; padding: 24px; text-align: center;">
                <h2 style="color: white; margin: 0; font-size: 20px;">Pendaftaran Berhasil!</h2>
              </div>
              
              <!-- Content -->
              <div style="padding: 32px;">
                <p style="color: #3f3f46; margin: 0 0 24px;">
                  Hai <strong>${attendeeName}</strong>,<br><br>
                  Kamu sudah terdaftar untuk event berikut:
                </p>
                
                <!-- Event Details -->
                <div style="background: #f4f4f5; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                  <h3 style="color: #18181b; margin: 0 0 12px; font-size: 18px;">${eventTitle}</h3>
                  <p style="color: #71717a; margin: 0; font-size: 14px; line-height: 1.6;">
                    📅 ${formattedDate}${formattedTime ? ` • ${formattedTime}` : ""}<br>
                    ${eventLocation ? `📍 ${eventLocation}` : ""}
                  </p>
                </div>
                
                <!-- QR Code Section -->
                <div style="text-align: center; margin-bottom: 24px;">
                  <p style="color: #71717a; font-size: 14px; margin: 0 0 16px;">
                    Kode Tiket: <strong style="color: #18181b;">${qrCode}</strong>
                  </p>
                  <a href="${ticketUrl}" style="display: inline-block; background: #0d9488; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600;">
                    Lihat Tiket & QR Code
                  </a>
                </div>
                
                <!-- Instructions -->
                <div style="border-top: 1px solid #e4e4e7; padding-top: 24px;">
                  <p style="color: #71717a; font-size: 14px; margin: 0; line-height: 1.6;">
                    <strong style="color: #3f3f46;">Petunjuk:</strong><br>
                    1. Simpan atau screenshot tiket kamu<br>
                    2. Tunjukkan QR code saat check-in di lokasi event<br>
                    3. Panitia akan scan QR code untuk verifikasi
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 32px;">
              <p style="color: #a1a1aa; font-size: 12px; margin: 0;">
                Email ini dikirim oleh Tixora.<br>
                Platform event registration gratis.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Failed to send email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Email error:", err);
    return { success: false, error: "Failed to send email" };
  }
}
