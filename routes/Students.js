const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const jwt = require('jsonwebtoken');
const Students = require('../models/student');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // req.userId = decoded.id;
        req.schoolId = decoded.id;
        next();
    });
};



// Add new staff
router.post('/', (req, res) => {
    const { studentId, name, year, image, designation, schoolName, schoolCode, className, section, shift, classRoll, gender, fatherName, motherName, phone, email, division, district, address } = req.body;
    const student = new Student({ studentId, name, year, image, designation, schoolName, schoolCode, className, section, shift, classRoll, gender, fatherName, motherName, phone, email, division, district, address });

    student.save()
        .then(() => {
            res.status(201).json(student);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});



// Update a staff by email address
router.patch('/:email', (req, res) => {
    const { name, schoolName, schoolCode, designation, phone, email, address, about } = req.body;
    const { email: staffEmail } = req.params;

    // Find the staff by email address
    Student.findOne({ email: staffEmail })
        .then((staff) => {
            if (!staff) {
                return res.status(404).json({ error: 'staff not found' });
            }

            // Update the staff fields if provided
            if (name) Student.name = name;
            if (schoolName) Student.schoolName = schoolName;
            if (schoolCode) Student.schoolCode = schoolCode;
            if (designation) Student.designation = designation;
            if (phone) Student.phone = phone;
            if (email) Student.email = email;
            if (address) Student.address = address;
            if (about) Student.about = about;

            // Save the updated staff
            Student.save()
                .then((updatedStaff) => {
                    res.json(updatedStaff); // Respond with the updated staff
                })
                .catch((error) => {
                    console.error('Error updating staff:', error);
                    res.status(500).json({ error: 'Internal server error' });
                });
        })
        .catch((error) => {
            console.error('Error finding staff:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});



// //get the value according to the email address
// router.get('/:schoolCode', (req, res) => {
//     const { schoolCode } = req.params; // Get schoolCode from route parameter
//     const { date } = req.query; // Get date from query parameter
//     console.log(schoolCode, date);
//     Student.find({ schoolCode, date }) // Use find to retrieve students with the given schoolCode and date
//         .then((students) => {
//             if (!students || students.length === 0) {
//                 return res.status(404).json({ error: 'Students not found' });
//             }
//             res.json(students);
//         })
//         .catch((error) => {
//             console.error('Error fetching student data:', error);
//             res.status(500).json({ error: 'Internal server error' });
//         });
// });

router.get('/:schoolCode', (req, res) => {
    const { schoolCode } = req.params; // Get schoolCode from route parameter
    const { year } = req.query; // Get date from query parameter

    // Here, you can use the schoolCode and date to fetch the relevant student data
    // For example, querying your database using Mongoose


    Student.find({ schoolCode, year })
        .then((students) => {
            if (!students || students.length === 0) {
                return res.status(404).json({ error: 'Students not found' });
            }
            res.json(students);
        })
        .catch((error) => {
            console.error('Error fetching student data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.get('/details/:studentId', (req, res) => {
    const { studentId } = req.params; // Get studentId from route parameter
    const { schoolCode } = req.query; // Get schoolCode from query parameter
    console.log(studentId, schoolCode)
    Student.find({ studentId, schoolCode })
        .then((students) => {
            if (!students || students.length === 0) {
                return res.status(404).json({ error: 'Students not found' });
            }
            res.json(students);
        })
        .catch((error) => {
            console.error('Error fetching student data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


// Get all school
// router.get('/', verifyToken, (req, res) => {
// router.get('/:id', (req, res) => {
//     const studentId = req.params.id;

//     Student.findById(studentId)
//         .then((student) => {
//             if (!student) {
//                 return res.status(404).json({ error: 'Student not found' });
//             }
//             res.json(student);
//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });



//get the value according to the email address
// router.get('/', (req, res) => {
//     const { email } = req.query;

//     Student.findOne({ email })
//         .then((staff) => {
//             if (!staff) {
//                 return res.status(404).json({ error: 'staff not found' });
//             }
//             res.json(staff);
//         })
//         .catch((error) => {
//             console.error('Error fetching staff data:', error);
//             res.status(500).json({ error: 'Internal server error' });
//         });
// });



// Update a staff by ID
router.put('/:id', (req, res) => {
    const { admitCard } = req.body;
    const { id } = req.params;
    Student.findById(id)
        .then((student) => {
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            // Update the staff fields if provided
            if (admitCard) student.admitCard = admitCard;



            // Save the updated staff
            student.save()
                .then((updatedStudent) => {
                    res.json(updatedStudent); // Respond with the updated staff
                })
                .catch((error) => {
                    console.error('Error updating student:', error);
                    res.status(500).json({ error: 'Internal server error' });
                });
        })
        .catch((error) => {
            console.error('Error finding student:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});



// DELETE route to delete a student by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Get the student ID from the route parameter

    try {
        // Find the student by ID and delete it
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            // If no student with the given ID is found, return a 404 response
            return res.status(404).json({ error: 'Student not found' });
        }

        // If the student is successfully deleted, return a success message
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        // If an error occurs, return a 500 internal server error response
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const updatedData = req.body;
        console.log(studentId, updatedData)
        // Find the student by ID and update their information
        const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedData, {
            new: true, // Return the updated document
        });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});






module.exports = router;
