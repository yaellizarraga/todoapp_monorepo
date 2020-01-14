const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

/*Some mongo stuff */
require('./config/connection');
const taskModel = require('./config/models/task');
const userModel = require('./config/models/user');
const tasksEntity = mongoose.model('Task', taskModel);
const usersEntity = mongoose.model('User', userModel);

/*
middlewares
*/
app.use(cors());
app.use(bodyParser());
app.use(bodyParser.json());

/*
Task urls
*/

app.get('/tasks', (req, res) => {
   tasksEntity.find({}, '', function(err, tasks){
        if(!err){
            res.json({
                tasks: tasks
            });
        }else{
            res.status(500);
        }
   }); 
});

app.get('/tasks/:id', (req, res) => {
    var taskId = req.params.id;
    tasksEntity.findOne({'_id': taskId}, '', function(err, task){
        if(!err){
            res.json({
                task:task	
            });
        }else{
            res.status(500);
        }
    });
});

app.post('/task/create', (req, res) => {
    var data = req.body;
    var newTask = new tasksEntity(data);
    newTask.save(function(err, result){
        if(!err){
            res.json({
                task: result
            });
        }else{
            res.status(500);
        }
    });
});

app.post('/task/update', (req, res) => {
    console.log(req.body);
    const {flag} = req.body;
    const {id} = (flag==='update')?req.body.task:req.body;
    if(flag === 'update'){
        const {title, description, date} = req.body.task;
        var toUpdate = {
            title:title,
            description:description, 
            date:date
        };
    }else if(flag === 'notDone'){
        var toUpdate = {
            taskStatus:false
        }
    }else{
        var toUpdate = {
            taskStatus: true
        };
    }
    tasksEntity.findByIdAndUpdate(id,toUpdate,{new:true}, function(err, result){
        if(!err){
            res.json({
                message:'updated',
                result:result
            });
        }else{
            res.status(500);
        }
    });
});

app.post('/task/delete', (req, res) => {
    var { id } = req.body;
    tasksEntity.findOneAndDelete({ _id: id}, function(err){
        if(!err){
            res.json({
                message: 'deleted'
            });
        }else{
            res.status(500);
        }
    });
});

/*
User urls
 */

app.get('/users', (req, res) => {
    usersEntity.find({}, '', function(err, tasks){
         if(!err){
             res.json({
                 message: tasks
             });
         }else{
             res.status(500);
         }
    }); 
 });
 
 app.get('/users/:id', (req, res) => {
     var taskId = req.params.id;
     usersEntity.findOne({'_id': taskId}, '', function(err, task){
         if(!err){
             res.json({
                 message:task
             });
         }else{
             res.status(500);
         }
     });
 });

 app.post('/user/create', (req, res) => {
    var data = req.body;
    console.log(data);
    var newUser = new usersEntity(data);
    newUser.save(function(err){
        if(!err){
            res.json({
                message:"userCreated"
            });
        }else{
            res.status(500);
        }
    });
});

 app.get('/', (req, res ) => {
    res.json({
        message: "Welcome, this is a server for TODO LIST"
    });
 });

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server running on port '+port));