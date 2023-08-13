const Task = require('../models/Task');
const createError = require('../utils/error');  

const createTask = async(req,res,next)=>{
    try{
          const newTask = new Task({
             title: req.body.title,
              user: req.user.id,
              completed: req.body.completed 
          })
        const savedTask = await newTask.save(); 
        return res.status(201).json(savedTask);
    
    }
    catch(err){
       return next(err); 
    }
}

const getAllTasks = async(req,res,next)=>{
    try{
        const data = await Task.find({}); 
        return res.status(200).json(data); 
    }
    catch(err){
        return next(err); 
    }
}

const getCurrentUserTasks = async(req,res,next)=>{
    try{
        const data = await Task.find({user:req.user.id});
        return res.status(200).json(data); 
    }
    catch(err){
        next(err); 
    }
}

const updateTask = async(req,res,next)=>{
    try{
          const taskId = req.params.taskId; 
          const task = await Task.findByIdAndUpdate(taskId).exec(); 
          if(!task) return next(createError({status:404,message:"No Task Found"}));
          if(task.user.toString() !== req.user.id) return next(createError({status:401,message:"Its not you task"})); 
        const updatedTask = await Task.findByIdAndUpdate(taskId,{
            title: req.body.title,
            completed : req.body.completed
        },{new:true})
       res.status(200).json(updatedTask); 
    }
    catch(err){
        next(err); 
    }
}

const deleteTask = async(req,res,next)=>{
    try{
        const taskId = req.params.taskId; 
        const task = await Task.findByIdAndUpdate(taskId).exec(); 
        if(!task) return next(createError({status:404,message:"No Task Found"}));
        if(task.user.toString() !== req.user.id) return next(createError({status:401,message:"Its not your task"})); 
       const deletedTask = await Task.findByIdAndDelete(taskId); 
       res.status(200).json(deletedTask); 
    }
    catch(err){
        next(err); 
    }
}

module.exports = {createTask,getAllTasks,getCurrentUserTasks,updateTask,deleteTask}; 