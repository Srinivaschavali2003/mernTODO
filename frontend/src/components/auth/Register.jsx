import React from 'react'
import classes from './AuthForm.module.scss'; 
import axios from 'axios';
import { toast } from 'react-hot-toast';


function Register() {
    const register = async(e)=>{
          e.preventDefault(); 
        const user ={
            name : e.target.name.value,
            email:e.target.email.value,
            password : e.target.password.value,
        }; 
        // console.log(user); 
        try{
            await axios.post('http://localhost:5000/api/auth/register', user);
            toast.success('Register Successful')
        }
        catch(err){
            console.log(err); 
            toast.error('Register Failed')
        }
    }
  return (
    <div className={classes.register}>
      <h1 className={classes.title}>Register</h1>
      <form className={classes.authForm} onSubmit={register}>
        <label htmlFor='name'>
           Name
           <input type='text' name='name' placeholder='Full Name' required autoComplete='off'/>
        </label>
        <label htmlFor='email'>
             Email
             <input type='email' name='email' placeholder='Email' required autoComplete='off'/>
        </label>
        <label htmlFor='password'>
          Password
          <input type='password' name='password' placeholder='Password' required autoComplete='off' />
        </label>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Register
