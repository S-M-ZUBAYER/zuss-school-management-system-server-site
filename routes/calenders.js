const express = require('express');
const router = express.Router();
const Calendar = require('../models/calender');
let calendarData = [];

// PATCH /api/calendar/:id
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const calendar = await Calendar.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        );

        if (!calendar) {
            return res.status(404).json({ error: 'Calendar not found' });
        }

        return res.json(calendar);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});


router.patch('/', async (req, res) => {
    const { calendarImg, year, schoolName, currentSchoolCode, startMonth, endMonth, events } = req.body;

    try {
        // Check if a calendar with the given school code already exists
        const existingCalendar = await Calendar.findOne({ currentSchoolCode });

        if (existingCalendar) {
            // Update existing calendar  
            existingCalendar.calendarImg = calendarImg;
            existingCalendar.year = year;
            existingCalendar.startMonth = startMonth;
            existingCalendar.endMonth = endMonth;
            existingCalendar.events = events;
            await existingCalendar.save();

            res.json(existingCalendar);
        } else {
            // Create new calendar
            const newCalendar = new Calendar({
                calendarImg,
                year,
                schoolName,
                currentSchoolCode,
                startMonth,
                endMonth,
                events
            });
            await newCalendar.save();

            res.json(newCalendar);
        }
    } catch (error) {
        console.error('Error updating/creating calendar:', error);
        res.status(500).json({ error: 'An error occurred while updating/creating calendar' });
    }
});

router.get('/:currentSchoolCode', async (req, res) => {
    const currentSchoolCode = req.params.currentSchoolCode;

    try {
        // Find calendar based on currentSchoolCode
        const calendar = await Calendar.findOne({ currentSchoolCode });

        if (calendar) {
            res.json(calendar);
        } else {
            res.status(404).json({ error: 'Calendar not found' });
        }
    } catch (error) {
        console.error('Error retrieving calendar:', error);
        res.status(500).json({ error: 'An error occurred while retrieving calendar' });
    }
});


// router.get('/:schoolCode', async (req, res) => {
//     const { schoolCode } = req.params;

//     try {
//         const calendars = await Calendar.find({ schoolCode });
//         return res.json(calendars);
//     } catch (error) {
//         return res.status(500).json({ error: 'An error occurred' });
//     }
// });


module.exports = router;
