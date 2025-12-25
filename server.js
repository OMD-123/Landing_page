const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory data source (simple)
const reportData = {
  studentName: 'om Dandagvhal',
  skills: {
    pronunciation: 7.5,
    fluency: 6.5,
    vocabulary: 6.0,
    grammar: 7.0,
  },
};

// Static files
app.use(express.static(path.join(__dirname)));

// API endpoint
app.get('/api/report', (req, res) => {
  res.json(reportData);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});