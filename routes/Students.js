const express = require('express');
const router = express.Router();
const Students = require('../models/students');
const jwt = require('jsonwebtoken');




// Add new staff
router.post('/add', (req, res) => {
    const { studentId, name, year, image, designation, schoolName, schoolCode, className, section, shift, classRoll, gender, fatherName, motherName, phone, email, division, district, address } = req.body;
    const student = new Students({ studentId, name, year, image, designation, schoolName, schoolCode, className, section, shift, classRoll, gender, fatherName, motherName, phone, email, division, district, address });
    student.save()
        .then(() => {
            res.status(201).json(student);
            console.log(student)
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});



// Update a staff by email address
router.patch('/:email', (req, res) => {
    const { name, schoolName, schoolCode, designation, phone, address, about } = req.body;
    const { email } = req.params;

    // Find the staff by email address
    Students.findOne({ email })
        .then((student) => {
            if (!student) {
                return res.status(404).json({ error: 'staff not found' });
            }

            // Update the staff fields if provided
            if (name) Students.name = name;
            if (schoolName) Students.schoolName = schoolName;
            if (schoolCode) Students.schoolCode = schoolCode;
            if (designation) Students.designation = designation;
            if (phone) Students.phone = phone;
            if (email) Students.email = email;
            if (address) Students.address = address;
            if (about) Students.about = about;

            // Save the updated staff
            Students.save()
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




router.get('/student/:schoolCode', async (req, res) => {
    const { schoolCode } = req.params; // Get schoolCode from route parameter
    const { email, year } = req.query; // Get email and year from query parameters

    try {
        let query = { schoolCode };

        if (email) {
            // If email is provided, add it to the query
            query.email = email;
        }

        if (year) {
            // If year is provided, add it to the query
            query.year = year;
        }
        console.log(email, year, schoolCode)

        // Here, you can use the query object to fetch the relevant student data
        // For example, querying your database using Mongoose
        const students = await Students.find(query);

        console.log(students)
        if (!students || students.length === 0) {
            return res.status(404).json({ error: 'Students not found' });
        }
        res.json(students);
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.get('/:schoolCode', (req, res) => {
    const { schoolCode } = req.params; // Get schoolCode from route parameter
    const { year } = req.query; // Get date from query parameter

    // Here, you can use the schoolCode and date to fetch the relevant student data
    // For example, querying your database using Mongoose


    Students.find({ schoolCode, year })
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
    Students.find({ studentId, schoolCode })
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



// Update a staff by ID
router.put('/:id', (req, res) => {
    const { admitCard } = req.body;
    const { id } = req.params;
    Students.findById(id)
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
        const deletedStudent = await Students.findByIdAndDelete(id);

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
        const updatedStudent = await Students.findByIdAndUpdate(studentId, updatedData, {
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
