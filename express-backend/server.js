const express = require('express');
//express is a server side web application framework of node js

const mongoose = require('mongoose');
//an object datamodeling (ODM) librarys

const bodyParser = require('body-parser');
//it is a middlware to parse coming to serer request bodies

const cors = require('cors');
//it i a middle ware to providing some security feature(cros orgin resourse sharing)


//SERVER SETUP
const app = express();
const PORT = 3020 ;


//connection to mongodb database

mongoose.connect('mongodb://localhost:27017/mean-crud', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json()); //use body-parser to parse JSON data from incoming requests.

app.use(cors()); 




//definign the schema and model
const taskSchema = new mongoose.Schema({
    title:String,
    description:String,
});

const Task = mongoose.model('Task', taskSchema);
//creating  a mongoose model named Task based on the above schema

//CRUD-create read update delete

//Retrive READ all task from database (R)
app.get('/api/tasks',async(req,res)=> {
    const tasks = await Task.find();
    res.json(tasks)
});


//creating new task in the database
app.post('/api/tasks' , async (req,res)=> {
    const newTask = new Task(req.body);
    await newTask.save()
    res.json(newTask);
})

//updating task in the database 
app.put('/api/tasks/:id',async(req,res) => {
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body ,{new:true});
    res.json(updateTask);
});

//delete -D
app.delete('api/taslks/:id',async(req,res)=>{
    await Task.findByIdAndDelete(req.params.id);

});

//start the server

app.listen(PORT,() =>{
    console.log(`server is runing on ${3020}`);
});