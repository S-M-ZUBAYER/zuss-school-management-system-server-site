const express = require('express');
const port = 5000; // or any port you prefer
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require("cors");
require("dotenv").config();




const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


const schoolRoutes = require('./routes/schools');
const classesRoutes = require('./routes/Classes');
const attendanceRoutes = require('./routes/attendences');
const noticeRoutes = require('./routes/notices');
const profileRoutes = require('./routes/profiles');
const staffRoutes = require('./routes/Staffs');
const studentRoutes = require('./routes/Students');
const calendarRoutes = require('./routes/calenders')



// Middleware to parse JSON data
app.use(express.json());


//jwt token part start from here
// Generate JWT token
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Add authentication logic here (e.g., check username and password against database)

    // For demo purposes, let's assume authentication succeeds
    const userId = 'user123'; // Replace with actual user ID

    const token = jwt.sign({ id: userId }, 'secret_key', { expiresIn: '1h' });

    res.json({ token });
});



app.use('/api/schools', schoolRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/staffs', staffRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/calendar', calendarRoutes);

// app.get('/user', (req, res) => {
//     res.send({ message: "Hi affif vi" })
// })


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});









// Connect to MongoDB
mongoose.connect('mongodb+srv://KidSpaceDBUser:NdX2OYU7WNNoHo85@cluster0.p2sr91x.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });
