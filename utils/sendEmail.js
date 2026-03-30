const axios = require("axios");

const sendEmail = async (options) => {
  try {
    const { email, subject, message } = options;

    const data = {
      sender: {
        name: "Fony App",
        email: process.env.BREVO_FROM_EMAIL || "noreply@fonyapp.com",
      },
      to: [
        {
          email: email,
          name: email,
        },
      ],
      subject: subject,
      htmlContent: message,
    };

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      data,
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      },
    );

    console.log("Email sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

module.exports = sendEmail;
