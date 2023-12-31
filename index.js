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
const stdAttendanceRoutes = require('./routes/stdAttendance');
const noticeRoutes = require('./routes/notices');
const profileRoutes = require('./routes/profiles');
const staffRoutes = require('./routes/Staffs');
const studentRoutes = require('./routes/Students');
const calendarRoutes = require('./routes/calenders');
const schoolUsersRoutes = require('./routes/SchoolUsers')
const schoolEventsRoutes = require('./routes/events')
const schoolAdmissionRoutes = require('./routes/admission')
const schoolApplicationRoutes = require('./routes/application')
const staffSalaryRoutes = require('./routes/salary')
const generateClassRoutineRoutes = require('./routes/classRoutine')
const PaymentSystemRoutes = require('./routes/paymentSystem')
const TermSubjectsRoutes = require('./routes/termSubject')
const payFeesRoutes = require('./routes/payFees')
const TcrAtdTimeRoutes = require('./routes/teacherAtdSetTime')
const AddUpdateResultRoutes = require('./routes/AddUpdateResult')
const SliderImgsRoutes = require('./routes/SliderImgs')
const NoticeLinerRoutes = require('./routes/NoticeLiner')
const PaymentNumbersRoutes = require('./routes/PaymentNumbers')



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
app.use('/api/stdAttendances', stdAttendanceRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/staffs', staffRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/schoolUser', schoolUsersRoutes);
app.use('/api/schoolEvents', schoolEventsRoutes);
app.use('/api/admissionInfo', schoolAdmissionRoutes);
app.use('/api/application', schoolApplicationRoutes);
app.use('/api/staffSalary', staffSalaryRoutes);
app.use('/api/classRoutine', generateClassRoutineRoutes);
app.use('/api/stdPayment', PaymentSystemRoutes);
app.use('/api/termSubject', TermSubjectsRoutes);
app.use('/api/payFees', payFeesRoutes);
app.use('/api/teacherSetTime', TcrAtdTimeRoutes);
app.use('/api/AddUpdateResultRoutes', AddUpdateResultRoutes);
app.use('/api/SliderImgs', SliderImgsRoutes);
app.use('/api/NoticeLiner', NoticeLinerRoutes);
app.use('/api/PaymentNumbers', PaymentNumbersRoutes);

app.get('/', (req, res) => {
    res.send({ message: "Welcome to Zuss school management system server site" })
})


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});









// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p2sr91x.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });



// Connect to MongoDB
// mongoose.connect('mongodb+srv://school-management-system:zQubUG*#w4dGeX@cluster0.6n51xnc.mongodb.net/', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB', error);
//     });
