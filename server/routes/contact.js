const express = require("express");
const router = express.Router();
const { query } = require("../config/database");
const nodemailer = require("nodemailer");

// Get all contact messages (for admin)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const contacts = await query(
      "SELECT * FROM contacts ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [parseInt(limit), parseInt(offset)],
    );

    const totalResult = await query("SELECT COUNT(*) FROM contacts");
    const total = parseInt(totalResult.rows[0].count);

    res.json({
      success: true,
      data: contacts.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching contact messages",
      error: error.message,
    });
  }
});

// Create new contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Send email directly without database storage
    await sendEmailNotification({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: "Message sent successfully to email!",
      data: { name, email, subject, message, sentAt: new Date() },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
});

// Update contact status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const result = await query(
      "UPDATE contacts SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [status, req.params.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating status",
      error: error.message,
    });
  }
});

// Delete contact message
router.delete("/:id", async (req, res) => {
  try {
    const result = await query(
      "DELETE FROM contacts WHERE id = $1 RETURNING *",
      [req.params.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting message",
      error: error.message,
    });
  }
});

// Email notification function
async function sendEmailNotification({ name, email, subject, message }) {
  try {
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "kemalelias67@gmail.com",
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Sent from Elias Portfolio Contact Form</small></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email notification sent");
  } catch (error) {
    console.error("❌ Email error:", error);
  }
}

module.exports = router;
