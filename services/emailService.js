const { BrevoClient } = require("@getbrevo/brevo");

const client = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

exports.sendEmail = async (to, subject, htmlContent) => {
  try {
    await client.transactionalEmails.sendTransacEmail({
      sender: {
        email:
          process.env.BREVO_SENDER_EMAIL ||
          process.env.ADMIN_EMAIL ||
          "noreply@fonyapp.com",
        name: process.env.BREVO_SENDER_NAME || "Fony App",
      },
      to: [{ email: to }],
      subject,
      htmlContent,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Brevo sendEmail error:", error.message);
    throw new Error("Failed to send email");
  }
};
