import React, { useEffect, useState } from 'react'
import classes from './Navbar.module.scss'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {FaUserAlt} from 'react-icons/fa'; 
import { toast } from 'react-hot-toast';



function Navbar() {
  const [user,setUser] = useState(null); 
  const navigate= useNavigate(); 
  const getUser = async()=>{
    try{
      const { data } = await axios.get('http://localhost:5000/api/users/me');
  setUser(data);
    }
    catch(err){
console.log(err); 
    }
  }; 

  useEffect(()=>{
    getUser(); 
  },[]); 

  const handleLogout = async()=>{
     try{
      await axios.get('http://localhost:5000/api/auth/logout'); 
      setUser(null); 
      toast.success('Logout successful');
        navigate('/auth') ;
     }
   catch(err){
console.log(err);
   }

  }

  if(!user) return null; 

  return (
   <header>
    <div className={classes.userInfo}>
    <FaUserAlt className={classes.userIcon} />
    <div>
      <h1 className={classes.name}>{user.name}</h1>
      <h1 className={classes.email}>{user.email}</h1>
      <Link to='/edit-profile' className={classes.editBtn}>Edit</Link>
    </div>
    </div>
    <nav>
      <button type='button' className={classes.logout} onClick={handleLogout}>logout</button>
    </nav>
   </header>
  )
}

export default Navbar
