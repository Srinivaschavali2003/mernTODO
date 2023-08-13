import React from 'react'
import classes from './AuthForm.module.scss'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Login() {
    const navigate = useNavigate(); 
    const login = async(e)=>{
       e.preventDefault();
       const email = e.target.email.value ;
       const password = e.target.password.value; 

       try{
          await axios.post('http://localhost:5000/api/auth/login',{
                email,
                password
             }); 
             navigate('/'); 
             toast.success('Login Successful'); 
       }
       catch(err){
        console.log(err); 
        toast.error('Login Failed'); 
       }
    }
  return (
    <div className={classes.register}>
     <h1 className={classes.title}>
        Login
     </h1>
     <form className={classes.authForm} onSubmit={login}>
        <label htmlFor='email'>
            Email
            <input type='email' name='email' placeholder='email' required/>
        </label>
        <label htmlFor='password'>
            Password
            <input type="password" name='password' placeholder='password' required/>
        </label>
        <br />
        <button type='submit'>Login</button>
     </form>
    </div>
  )
}

export default Login
