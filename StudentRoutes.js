const express = require('express');
const router = express.Router();

// In-memory student data
let students = [
  { id: 1, name: "Arun", dept: "CSE", age: 23 },
  { id: 2, name: "Bala", dept: "CSE", age: 23 }
];

// ================= GET ALL =================
router.get('/', (req, res) => {
  res.json(students);
});

// ================= GET BY ID =================
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// ================= CREATE =================
router.post('/', (req, res) => {
  const { name, dept, age } = req.body;

  if (!name || !dept || !age) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    dept,
    age
  };

  students.push(newStudent);
  res.status(201).json(newStudent); 
});

// ================= UPDATE =================
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, dept, age } = req.body;

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students[index] = {
    id,
    name: name ?? students[index].name,
    dept: dept ?? students[index].dept,
    age: age ?? students[index].age
  };

  res.json({
    message: "Student updated successfully",
    student: students[index]
  });
});

// ================= DELETE =================
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const before = students.length;

  students = students.filter(s => s.id !== id);

  if (students.length === before) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json({ message: "Student deleted successfully" });
});

module.exports = router;
