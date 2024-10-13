const express = require('express');
const Employee = require('../models/employeeModel');
const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching employees' });
    }
});

// Create new employee
router.post('/employees', async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
    try {
        const employee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
        await employee.save();
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error creating employee' });
    }
});

// Get employee by ID
router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching employee' });
    }
});

// Update employee by ID
router.put('/employees/:eid', async (req, res) => {
    const { eid } = req.params;
    const updates = req.body;

    try {
        const employee = await Employee.findByIdAndUpdate(eid, updates, { new: true });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee details updated successfully', employee });
    } catch (err) {
        console.error('Error updating employee:', err); // Log the error for debugging
        res.status(500).json({ error: 'Error updating employee' });
    }
});


// Delete employee by ID
router.delete('/employees', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.query.eid);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(204).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting employee' });
    }
});

module.exports = router;
