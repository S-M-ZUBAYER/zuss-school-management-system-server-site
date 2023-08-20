const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const jwt = require('jsonwebtoken');

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



//get the value according to the email address
router.get('/:schoolCode', (req, res) => {
    const { schoolCode } = req.params; // Get schoolCode from route parameter
    const { year } = req.query; // Get date from query parameter

    Student.find({ schoolCode, year })
        .then((students) => {
            if (students.length === 0) {
                return res.status(404).json({ error: 'No students found' });
            }

            // If you expect only one student, you can access it with students[0]
            // Otherwise, send the entire students array
            res.json(students);
        })
        .catch((error) => {
            console.error('Error fetching student data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


// Get all school
// router.get('/', verifyToken, (req, res) => {
router.get('/:id', (req, res) => {
    const studentId = req.params.id;

    Student.findById(studentId)
        .then((student) => {
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.json(student);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});



//get the value according to the email address
router.get('/', (req, res) => {
    const { email } = req.query;

    Student.findOne({ email })
        .then((staff) => {
            if (!staff) {
                return res.status(404).json({ error: 'staff not found' });
            }
            res.json(staff);
        })
        .catch((error) => {
            console.error('Error fetching staff data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});



// Update a staff by ID
router.put('/:id', (req, res) => {
    const { admitCard } = req.body;
    const { id } = req.params;
    console.log(admitCard, id)
    Student.findById(id)
        .then((student) => {
            if (!student) {
                console.log("dont")
                return res.status(404).json({ error: 'Student not found' });
            }
            console.log(student)
            // Update the staff fields if provided
            if (admitCard) student.admitCard = admitCard;

            console.log(student.admitCard)

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



// Delete a student by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    // Find the staff by ID and delete it
    Student.findByIdAndDelete(id)
        .then((student) => {
            if (!student) {
                return res.status(404).json({ error: 'student not found' });
            }

            res.json({ message: 'student deleted successfully' });
        })
        .catch((error) => {
            console.error('Error deleting student:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});






module.exports = router;
