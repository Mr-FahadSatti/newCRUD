import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import{URL} from '../../src/url'
import { useNavigate } from 'react-router-dom'


const CreateUser = () => {

    const [username, setuserName]= useState()
    const [email,setEmail] = useState()
    const [password, setPassword]= useState()
    const [error,setError] = useState(false)
    const [pasError, setPassError] = useState(false)
    const navigate= useNavigate()


    const handelSubmit= async (e)=>{
        try{
            e.preventDefault();
            const res= await axios.post(URL+'/user/create',
            {username,email,password })
            setError(res.data.error)
            setuserName(res.data.username)
            setEmail(res.data.email)
            setPassword(res.data.password)
            navigate('/')
        }
        catch(err)
        {
        if (err.response && err.response.status === 400) 
        {
            if (err.response.data.message === 'Invalid email format') 
            {
                alert('Invalid email format. Please enter a valid email.')
            } 
            else  {
                alert('Invalid password format. Please enter a password with at least 8 characters including at least one number, one special character, and one letter.')
            }
        } 
        else 
        {
            setError(true)  
            console.log(err)
        }
    }
       
    }
  return (
    <div className='flex items-center justify-between px-6 md:px-[200px] py-4 bg-slate-300'>
        <div className='w-full flex justify-center items-center h-[100vh]'>
        <form className='flex flex-col items-center space-y-5'>
    <h1 className='font-bold text-2xl'>Add User</h1>
    <div>
        <input className='w-full px-4 py-2 border border-black rounded-lg' type='text' placeholder='Name'
               onChange={(e)=>setuserName(e.target.value)}/>
    </div>
    <div>
        <input className='w-full px-4 py-2 border border-black rounded-lg' type='email' placeholder='Enter your email'
               onChange={(e)=> setEmail(e.target.value)}/>
    </div>
    <div>
        <input className='w-full px-4 py-2 border border-black rounded-lg' type='password' placeholder='Enter your password'
               onChange={(e)=> setPassword(e.target.value)}/>
    </div>
    <div>
        <button className='w-full px-4 py-2 text-lg font-bold text-white bg-gray-900 rounded-lg hover:bg-gray-700'
                onClick={handelSubmit}>
            Submit
        </button>
    </div>
    {error && <h3 className='text-red-500 text-sm'>Something went wrong</h3>}
</form>

        </div>              
    </div>
  )
}

export default CreateUser