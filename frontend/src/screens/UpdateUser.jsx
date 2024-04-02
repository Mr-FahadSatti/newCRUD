import React from 'react'
import { useParams } from 'react-router-dom'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {URL} from '../url'



const UpdateUser = () => {

    const {id} = useParams()
    const [username, setName] = useState()
    const [email, setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate= useNavigate()
    useEffect(()=>{
        axios.get(URL+'/user/getbyId/'+id)
        .then(result => {console.log(result)
        setName(result.data.username)
        setEmail(result.data.email)
        setPassword(result.data.password)
        }).catch(error => console.error(error))
    },[])


    const update=(e)=>{
        e.preventDefault();
        axios.put(URL+"/user/update/"+id,{username,email,password})
        .then(result =>{console.log(result)
        navigate('/') })
          .catch(error =>console.log(error))
    }

  return (
    <div className='d-flex align-center bg-slate-200 justify-between items-center h-md'>
        <div className='w-full flex justify-center items-center h-[100vh]'>
            <form className='flex flex-col items-center space-y-5' onSubmit={update}>
            <h1 className="font-bold text-2xl ">Update</h1>
                <div>
                    <input type='text' placeholder='Name' className='w-full px-4 py-2 border border-black rounded-lg' 
                    value={username} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <input type='email' placeholder='Email' className='w-full px-4 py-2 border border-black rounded-lg'
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type='password' placeholder='Password' className='w-full px-4 py-2 border border-black rounded-lg'
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className='px-4 py-2 text-lg font-bold text-white bg-gray-900 rounded-lg hover:bg-gray-700'>Submit</button>
            </form>
        </div>              
    </div>
  )
}

export default UpdateUser