const express = require('express');
const app = express();
const PORT = 3000;

// Parse JSON body
app.use(express.json());

// Import routes
const studentRoutes = require('./routes/studentRoutes');

// Mount routes
app.use('/students', studentRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Student Management API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
