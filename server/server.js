import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Email endpoint
app.post("/api/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "in.bebigupta@gmail.com",
        pass: "pmum fozx keev ywbw",
      },
    });

    // Send to receiver
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "skgupta224@gmail.com",
      subject,
      text: message,
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: "skgupta224@gmail.com",
      to: email,
      subject: "We received your message",
      text: `Hi ${name},\n\nThank you for contacting us!\n\nYour message:\n${message}`,
    });

    res.status(200).send({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Email send error:", error); // full error in backend logs
    res.status(500).send({
      error: "Email sending failed",
      details: error.message, // show real reason in Postman
    });
  }
});

// Serve Angular build in production
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(3000, () => console.log("Server running on port 3000"));
