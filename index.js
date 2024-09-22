const express = require('express');
const mime = require('mime-types');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({ limit: '50mb' }));

// POST Method to handle incoming requests
app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const highestLowercase = alphabets.filter(char => char === char.toLowerCase()).sort().slice(-1);

  let fileValid = false;
  let mimeType = null;
  let fileSizeKB = 0;

  if (file_b64) {
    try {
      const fileBuffer = Buffer.from(file_b64, 'base64');
      fileSizeKB = fileBuffer.length / 1024;
      mimeType = mime.lookup(fileBuffer) || 'text/plain';
      fileValid = mimeType && fileSizeKB > 0;
    } catch (error) {
      console.log('Error handling file:', error);
    }
  }

  res.json({
    is_success: true,
    user_id: 'your_name_ddmmyyyy',
    email: 'your_email@college.edu',
    roll_number: 'your_roll_number',
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase,
    file_valid: fileValid,
    file_mime_type: mimeType || 'unknown',
    file_size_kb: fileSizeKB
  });
});

// GET Method to return hardcoded response
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => console.log(`Server running on port ${port}`));