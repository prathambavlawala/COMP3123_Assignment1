const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/comp3123_assigment1';

// MongoDB connection
mongoose.connect('mongodb+srv://bavlawalapratham:8pTiuHjOWHOZ5iA6@cluster0.q1rmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
    


// API routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Start server
const PORT = 8084;  
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
