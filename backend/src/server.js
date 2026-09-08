import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'B.T. Naik & Company Backend API',
    timestamp: new Date().toISOString(),
  });
});

// Contact Form Submission Endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields (name, email, subject, message).' });
  }

  // Log inquiry (In production, wire to email service or database)
  console.log(`[INQUIRY RECEIVED] Subject: ${subject}`);

  return res.json({
    success: true,
    message: 'Inquiry received successfully. Our team will get back to you shortly.',
  });
});

// Rate Charts API endpoint
app.get('/api/rates', (req, res) => {
  res.json({
    rates: [
      { id: 'gst-rates', title: 'GST Rates Summary', lastUpdated: 'April 2026' },
      { id: 'tds-rates', title: 'TDS Rates (FY 2025-26)', lastUpdated: 'April 2026' },
      { id: 'depreciation-rates', title: 'Depreciation Rates (Income Tax Act)', lastUpdated: 'April 2026' },
    ],
  });
});

// Fallback Route
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

app.listen(PORT, () => {
  console.log(`B.T. Naik & Co. Backend API running on port ${PORT}`);
});
