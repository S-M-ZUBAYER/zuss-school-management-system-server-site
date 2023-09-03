const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const jwt = require('jsonwebtoken');
const Applications = require('../models/application');

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
    const { applicationId, name, date, designation, schoolName, schoolCode, previousClass, averageMark, className, gender, fatherName, motherName, phone, email, division, district, image, accept, admitCard, waiting, number, transactionId, agentName, amount, extraInfo, address } = req.body;
    const application = new Applications({ applicationId, name, date, designation, schoolName, schoolCode, previousClass, averageMark, className, gender, fatherName, motherName, phone, email, division, district, image, accept, admitCard, waiting, number, transactionId, agentName, amount, extraInfo, address });

    application.save()
        .then(() => {
            res.status(201).json(application);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});


router.put('/:applicationId', async (req, res) => {
    const { applicationId } = req.params;

    try {
        const updatedApplication = await Applications.findOneAndUpdate(
            { applicationId },
            { accept: true },
            { new: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
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


// Get all school
// router.get('/', verifyToken, (req, res) => {
// router.get('/', (req, res) => {
//     Applications.find()
//         .then((students) => {
//             res.json(students);
//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });


// // Get all school
// // router.get('/', verifyToken, (req, res) => {
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
router.get('/:schoolCode', (req, res) => {
    const { schoolCode } = req.params; // Get schoolCode from route parameter
    const { date } = req.query; // Get date from query parameter

    Applications.find({ schoolCode, date }) // Use find to retrieve applications with the given schoolCode and date
        .then((applications) => {
            if (!applications || applications.length === 0) {
                return res.status(404).json({ error: 'Applications not found' });
            }
            res.json(applications);
        })
        .catch((error) => {
            console.error('Error fetching application data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});



//get the value according to the email address
router.get('/details/:applicationId', (req, res) => {
    const { applicationId } = req.params;
    Applications.findOne({ applicationId }) // Use findOne to retrieve a single application
        .then((application) => {
            if (!application) {
                return res.status(404).json({ error: 'Application not found' });
            }
            res.json(application);
        })
        .catch((error) => {
            console.error('Error fetching application data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});




// Update a staff by ID
router.put('/:id', (req, res) => {
    const { name, schoolName, schoolCode, className, section, shift, fatherName, motherName, designation, phone, email, address } = req.body;
    const { id } = req.params;

    // Find the staff by ID
    Student.findById(id)
        .then((student) => {
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }

            // Update the staff fields if provided
            if (name) student.name = name;
            if (schoolName) student.schoolName = schoolName;
            if (schoolCode) student.schoolCode = schoolCode;
            if (className) student.className = className;
            if (section) student.section = section;
            if (shift) student.shift = shift;
            if (fatherName) student.fatherName = fatherName;
            if (motherName) student.motherName = motherName;
            if (designation) student.designation = designation;
            if (phone) student.phone = phone;
            if (email) student.email = email;
            if (address) student.address = address;
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
    Applications.findByIdAndDelete(id)
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


router.put('/admitCard/:id', (req, res) => {
    const { admitCard } = req.body;
    const { id } = req.params;
    Applications.findById(id)
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



module.exports = router;
