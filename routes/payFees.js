const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const PayFees = require('../models/PayFee');




// Add new staff
router.post('/', (req, res) => {
    const { teacherStatus, studentId, schoolCode, Name, ClassName, SectionName, ShiftName, ClassRoll, proposalAmount, selectedPayments, paymentMethod, agentNumber, transactionId, PaidAmount, unpaidAmount, status } = req.body;
    const payFees = new PayFees({ teacherStatus, studentId, schoolCode, Name, ClassName, SectionName, ShiftName, ClassRoll, proposalAmount, selectedPayments, paymentMethod, agentNumber, transactionId, PaidAmount, unpaidAmount, status });

    payFees.save()
        .then(() => {
            res.status(201).json(payFees);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});


router.put('/updateStatus/:id', async (req, res) => {
    const { id } = req.params;
    const teacherStatus = false;

    try {
        // Find the payment status document by ID and update the teacherStatus
        const updatedStatus = await PayFees.findByIdAndUpdate(
            id,
            { teacherStatus },
            { new: true } // Return the updated document
        );

        if (!updatedStatus) {
            return res.status(404).json({ error: 'Payment status not found' });
        }

        res.json(updatedStatus);
    } catch (error) {
        console.error('Error updating teacher status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Update teacher status and selected payments by ID
router.put('/updateRejectStatus/:id', async (req, res) => {
    const { id } = req.params;
    const { teacherStatus, selectedPayments } = req.body;
    console.log(teacherStatus, selectedPayments)
    try {
        // Find the payment status document by ID and update the teacherStatus and selected payments
        const updatedStatus = await PayFees.findByIdAndUpdate(
            id,
            { teacherStatus },
            { new: true } // Return the updated document
        );

        if (!updatedStatus) {
            return res.status(404).json({ error: 'Payment status not found' });
        }

        // // Update selected payments
        // updatedStatus.status.forEach((payment) => {
        //     if (selectedPayments.includes(payment.purpose)) {
        //         payment.paid = false;
        //         console.log(payment)
        //     }
        // });

        // // Update paidAmount and unpaidAmount
        // updatedStatus.PaidAmount -= updatedStatus.proposalAmount;
        // updatedStatus.unpaidAmount += updatedStatus.proposalAmount;
        // updatedStatus.proposalAmount = 0;

        // // Save the updated payment status
        // await updatedStatus.save();

        const updatedPayments = updatedStatus.status.map((payment) => {
            if (selectedPayments.includes(payment.purpose)) {
                return { ...payment, paid: false };
            }
            return payment;
        });

        // Update paidAmount and unpaidAmount
        const totalPaid = updatedPayments.filter((payment) => payment.paid).reduce((acc, payment) => acc + parseFloat(payment.amount), 0);
        const totalUnpaid = updatedPayments.filter((payment) => !payment.paid).reduce((acc, payment) => acc + parseFloat(payment.amount), 0);

        updatedStatus.status = updatedPayments;
        updatedStatus.PaidAmount = totalPaid;
        updatedStatus.unpaidAmount = totalUnpaid;

        await updatedStatus.save();

        res.json(updatedStatus);
    } catch (error) {
        console.error('Error updating teacher status and payments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
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
            if (district) staff.district = district;
            if (division) staff.division = division;
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
            if (district) staff.district = district;
            if (division) staff.division = division;
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
router.get('/payStatus/:schoolCode', async (req, res) => {
    try {
        const { schoolCode } = req.params; // Get schoolCode from route parameter
        const { studentId } = req.query; // Get studentId from query parameter

        // Find payment status documents with the given schoolCode and studentId
        const paymentStatus = await PayFees.find({ schoolCode, studentId });

        if (!paymentStatus || paymentStatus.length === 0) {
            return res.status(404).json({ error: 'Payment status not found' });
        }

        res.json(paymentStatus);
    } catch (error) {
        console.error('Error fetching payment status data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/teacherPayStatus/:schoolCode', async (req, res) => {
    try {
        const { schoolCode } = req.params; // Get schoolCode from route parameter
        const teacherStatus = true; // Get studentId from query parameter

        // Find payment status documents with the given schoolCode and studentId
        const paymentStatus = await PayFees.find({ schoolCode, teacherStatus });

        if (!paymentStatus || paymentStatus.length === 0) {
            return res.status(404).json({ error: 'Payment status not found' });
        }

        res.json(paymentStatus);
    } catch (error) {
        console.error('Error fetching payment status data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get the value according to the email address
router.get('/:schoolCode/:email', (req, res) => {
    const { schoolCode, email } = req.params;

    // Use the staff model to find staff by school code and email
    Staff.find({ schoolCode, email })
        .then((staffs) => {
            res.json(staffs);
        })
        .catch((error) => {
            console.error('Error fetching staffs data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});



router.delete('/payStatus/:id', async (req, res) => {
    try {
        const paymentStatus = await PayFees.findById(req.params.id);

        if (!paymentStatus) {
            return res.status(404).json({ error: 'Payment status not found' });
        }

        // Perform the deletion using deleteOne
        await PayFees.deleteOne({ _id: req.params.id });

        res.json({ message: 'Payment status deleted successfully' });
    } catch (error) {
        console.error('Error deleting payment status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
