const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const criminalRoutes = require('./routes/criminalRoutes'); // ✅ New route

const app = express();

app.use(cors());
app.use(express.json());

// Serve profile images and criminal photos
app.use('/uploads', express.static(__dirname + '/uploads'));

// Register routes
app.use('/api/users', userRoutes);
app.use('/api/criminals', criminalRoutes); // ✅ Criminal routes

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://admin:cm8tMswD4Nbbp6w6@cluster0.6s6wqoz.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(err => console.log(err));
