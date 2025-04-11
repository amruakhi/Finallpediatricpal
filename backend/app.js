const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const fs = require('fs');
const path = require('path');

// Ensure uploads/licenses directory exists
const uploadDir = path.join(__dirname, 'uploads/licenses');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

require('dotenv').config();
require('./db/mongodb'); // Ensure this connects to MongoDB correctly

const pediatrician_route = require('./routes/pediatrician_route'); // Ensure this is correctly imported
const patient_route = require('./routes/patient_route'); // Ensure this is correctly imported
const authRoutes = require('./routes/authRoutes');


const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json()); // Global JSON parsing middleware
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/api', pediatrician_route);
app.use('/api', patient_route);
app.use('/api', authRoutes);



app.get('/*',function(req,res){res.sendFile(path.join(__dirname,'../frontend/index.html'));});
// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`${PORT} is up and running`);
});
