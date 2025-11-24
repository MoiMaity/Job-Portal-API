import nodemailer from "nodemailer";
import { transporter } from "../app.js";

// Accept common env var name variants to be more forgiving (EMAIL_USER, email_user, etc.)

export async function initiateEmailTransporter(EMAIL_USER, EMAIL_PASS) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
  try {
    await transporter.verify();
    console.log("Email transporter is ready (using environment variables)");
    return transporter;
  } catch (err) {
    console.warn(
      "Email transporter verification failed (using environment variables):",
      err && err.message ? err.message : err
    );
    return null;
  }
}

export const sendConfirmationEmail = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || "no-reply@example.com",
    to: email,
    subject: "Job Application Confirmation",
    text: "Thank you for applying! We will review your application.",
  };

  if (!transporter) {
    console.warn(
      "Skipping sending email to %s because transporter is not configured. (EMAIL_USER=%s)",
      email,
      process.env.EMAIL_USER ? "SET" : "NOT SET"
    );
    return;
  }
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (err) {
    console.error(
      "Failed to send email:",
      err && err.message ? err.message : err
    );
    if (err && err.code === "EAUTH") {
      console.error(
        "Authentication error when sending email. If you use Gmail, enable 2-Step Verification and create an App Password, then set EMAIL_USER to your Gmail address and EMAIL_PASS to the app password. See: https://support.google.com/mail/?p=BadCredentials"
      );
    }
    throw err;
  }
};
