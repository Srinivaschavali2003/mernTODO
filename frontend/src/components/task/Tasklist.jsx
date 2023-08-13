import React, { useEffect, useState } from 'react'
import classes from './Tasklist.module.scss'; 
import axios from 'axios';
import TaskItem from './TaskItem';
import { toast } from 'react-hot-toast';

function Tasklist() {
    const [taskList,setTaskList] = useState([]);
    const [isAddingNew,setIsAddingNew] = useState(false); 
    const [newTask,setNewTask] = useState(''); 

    const addNewTask = async(e)=>{
        e.preventDefault();
        if(newTask.length<=0){
            toast.error('Task is Empty'); 
            return ; 
        } 
        try{
            const {data} = await axios.post('http://localhost:5000/api/tasks',{
                title:newTask
            });
            toast.success('New Task Created'); 
            setTaskList([{...data},...taskList])
            setNewTask(''); 
            setIsAddingNew(false);
        
        }
        catch(err){
            console.log(err); 
        }
    }

    const getTasks = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/tasks/myTasks');
            setTaskList(
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            );
        } catch (err) {
            console.log(err);
        }
    };

    const addNewButtonClick = ()=>{
        setIsAddingNew(!isAddingNew); 
    }
    
    
    useEffect(()=>{
        getTasks();
    },[]) ;

    const deleteTask = async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/api/tasks/${id}`); 
            toast.success('Task Deleted'); 
            setTaskList(taskList.filter((task)=> task._id !==id)); 
        }
        catch(err){
            console.log(err); 
        }
    }
    
      return (
        <div>
          <div className={classes.topBar}>
            <button type='button' className={classes.addNew} onClick={addNewButtonClick}>Add New</button>
          </div>
          {isAddingNew && (
            <form className={classes.addNewForm} onSubmit={addNewTask}>
                <input type='text' value={newTask} onChange={e=> setNewTask(e.target.value)} placeholder='Task Title' />
                <button type='submit'>Add</button>
            </form>
          )}
          {taskList.length > 0 ? (
    <table className={classes.taskList_table}>
        <tbody>
            {taskList.map(task => (
                <TaskItem task={task} deleteTask={deleteTask} key={task._id} />
            ))}
        </tbody>
    </table>
) : 'no task found'}

        </div>
      )
}

export default Tasklist  
