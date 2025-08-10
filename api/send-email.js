// api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Gmail SMTP with App Password
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER, // your gmail
        pass: process.env.MAIL_PASS  // your app password
      }
    });

    // Email to Receiver
    await transporter.sendMail({
      from: `"${name}" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_RECEIVER, // where you want to receive the message
      subject: `Contact Form: ${subject}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`
    });

    // Confirmation Email to User
    await transporter.sendMail({
      from: `"Your Company" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'We Received Your Message',
      text: 'Thanks for contacting us. We will get back to you shortly.',
      html: `<p>Thanks for contacting us, ${name}. We will get back to you shortly.</p>`
    });

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Email sending failed', details: error.message });
  }
}
