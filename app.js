const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const expressLayouts = require('express-ejs-layouts');

//Set up EJS with layouts
app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('layout', 'layout');

//connection to mongodb
mongoose.connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
});

//middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//set view engine
app.set("view engine", "ejs");


//Define Schema
const todoSchema = new mongoose.Schema({
    task: { type: String, required: true },});

const Todo = mongoose.model('Todo', todoSchema);

//routes
app.get('/', async(req, res) => {
    try {
        const todos = await Todo.find();
        res.render('index', {todos});
    }
    catch(err){
        console.error(err);
        res.status(500).send('Error retrieving tasks.');
    }
});

app.post('/add', async(req, res) => {
    const newTask = new Todo({
        task: req.body.task,
    });

    try{
        await newTask.save();
        res.redirect('/');
    }
    catch(err){
        console.error(err);
        res.status(500).send('Error saving task.');
    }
});

app.post('/delete', async(req, res) => {
   
    try{
        await Todo.findByIdAndDelete(req.body.id);
        res.redirect('/');
    }
    catch(err){
        console.error(err);
        res.status(500).send('Error deleting task.');
    }
});

//server configurations
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
    console.error('Error: ', err.stack || err.message || err);
    res.status(500).send('Something broke!');
});



