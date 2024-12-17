// Importing...
const express = require('express');
const joi = require('joi');

// App
const app = express();

// For Using JSON
app.use(express.json());

// Declaring Object Students
const students = [
    {title:'Yuga Praveen', id:1},
    {title:'Suhail Ahemed', id:2},
    {title:'Nandha Kumar', id:3}
];

// Name Validating Function
function validateStudentTitle(student) {
    const schema = joi.object({ title: joi.string().min(4).required() });
    return schema.validate(student);
}

// GET REST APIs
app.get('/', (req, res) => {
    res.send('Hello, there! You start working with REST APIs with NodeJS!');
});

app.get('/_get/students', (req, res) => {
    res.send(students);
});

app.get('/_get/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) {
        res.status(404).send('<h2>Error 404: Not Found</h2>');
        return;
    }
    res.send(student);
});

// POST REST API
app.post('/_post/students', (req, res) => {
    // Validate the request body
    const { error } = validateStudentTitle(req.body);
    if (error) {
        res.status(400).send('Validation Error: ' + error.details[0].message);
        return;
    }

    // Create new student
    const student = {
        title: req.body.title,
        id: students.length + 1
    };
    students.push(student);

    // Send the created student
    res.send(student);
});

// PUT REST API
app.put('/_put/students/:id', (req, res) => {
    // Find the student
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) {
        res.status(404).send('<h2>Error 404: ID Not Found</h2>');
        return;
    }

    // Validate the request body
    const { error } = validateStudentTitle(req.body);
    if (error) {
        res.status(400).send('Validation Error: ' + error.details[0].message);
        return;
    }

    // Update student title
    student.title = req.body.title;
    res.send(student);
});

// DELETE REST API
app.delete('/_delete/students/:id', (req, res) => {
    // Find the student
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) {
        res.status(404).send('<h2>Error 404: ID Not Found</h2>');
        return;
    }

    // Remove the student from the array
    const index = students.indexOf(student);
    students.splice(index, 1);

    // Send the updated list of students
    res.send(students);
});

// Server Creation
const port = process.env.port || 8080;
app.listen(port, () => console.log("Listening on port 8080...\n\n"));
