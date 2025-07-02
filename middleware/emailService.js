import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-password",
  },
});

export const sendConfirmationEmail = (email) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Job Application Confirmation",
    text: "Thank you for applying! We will review your application.",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log("Email sent: " + info.response);
  });
};
