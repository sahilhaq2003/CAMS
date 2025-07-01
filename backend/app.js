const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded profile photos
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://admin:cm8tMswD4Nbbp6w6@cluster0.6s6wqoz.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(err => console.log(err));
