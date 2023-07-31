const express = require('express');
const router = express.Router();
const Staff = require('../models/staff');
const jwt = require('jsonwebtoken');
const Staffs = require('../models/staff');

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
    const { teacherId, name, schoolName, schoolCode, designation, phone, email, image, bloodGroup, address, about } = req.body;
    const staff = new Staff({ teacherId, name, schoolName, schoolCode, designation, phone, email, image, bloodGroup, address, about });
    console.log(staff)
    staff.save()
        .then(() => {
            res.status(201).json(staff);
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
    Staff.findOne({ email: staffEmail })
        .then((staff) => {
            if (!staff) {
                return res.status(404).json({ error: 'staff not found' });
            }

            // Update the staff fields if provided
            if (name) staff.name = name;
            if (schoolName) staff.schoolName = schoolName;
            if (schoolCode) staff.schoolCode = schoolCode;
            if (designation) staff.designation = designation;
            if (phone) staff.phone = phone;
            if (email) staff.email = email;
            if (address) staff.address = address;
            if (about) staff.about = about;

            // Save the updated staff
            staff.save()
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




// Update a staff by ID
router.put('/:id', (req, res) => {
    const { name, schoolName, schoolCode, designation, phone, email, address, about } = req.body;
    const { id } = req.params;

    // Find the staff by ID
    Staff.findById(id)
        .then((staff) => {
            if (!staff) {
                return res.status(404).json({ error: 'Staff not found' });
            }

            // Update the staff fields if provided
            if (name) staff.name = name;
            if (schoolName) staff.schoolName = schoolName;
            if (schoolCode) staff.schoolCode = schoolCode;
            if (designation) staff.designation = designation;
            if (phone) staff.phone = phone;
            if (email) staff.email = email;
            if (address) staff.address = address;
            if (about) staff.about = about;

            // Save the updated staff
            staff.save()
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


// // Get all school
// // router.get('/', verifyToken, (req, res) => {
// router.get('/', (req, res) => {
//     Staff.find()
//         .then((staffs) => {
//             res.json(staffs);
//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });


// Define the route to fetch notice data by school code
router.get('/', (req, res) => {
    const { schoolCode } = req.query;

    // Use the notice model to find the notices by school code
    Staffs.find({ schoolCode })
        .then((staffs) => {
            res.json(staffs);
            console.log(staffs)
        })
        .catch((error) => {
            console.error('Error fetching staffs data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

//get the value according to the email address
router.get('/', (req, res) => {
    const { email } = req.query;

    Staff.findOne({ email })
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


// Delete a staff by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    // Find the staff by ID and delete it
    Staff.findByIdAndDelete(id)
        .then((staff) => {
            if (!staff) {
                return res.status(404).json({ error: 'Staff not found' });
            }

            res.json({ message: 'Staff deleted successfully' });
        })
        .catch((error) => {
            console.error('Error deleting staff:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});



module.exports = router;
