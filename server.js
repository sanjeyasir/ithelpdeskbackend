const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());

// Importing database models and routes
const db = require('./models');
const userRoutes = require('./routes/user.route');
const masterRoutes = require('./routes/master.route');



// Middleware
app.use(express.json());
app.use('/api/helpdesk', userRoutes, masterRoutes);




// Handling 404 - route not found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler (500)
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Manual sync function (if you want to trigger it later)
const syncDatabase = async () => {
  try {
    // Perform sync only when necessary (can be with or without force/alter)
    await db.sequelize.sync({ force: false, alter: true });
    console.log('DB synced at index.js.');
  } catch (error) {
    console.error('Error syncing DB:', error);
  }
};

//Uncomment to manually sync the database when needed
// syncDatabase();



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

