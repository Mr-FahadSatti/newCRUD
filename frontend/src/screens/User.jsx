import axios from 'axios'
import React, { useEffect } from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {URL} from '../url'

const handledelete=(id) => {
    axios.delete(URL+"/user/delete/"+id)
    .then(res => {console.log(res)
    window.location.reload()})
    .catch(error =>console.log(error))
}

const User = () => {
    const [users, setUsers]= useState([])
    useEffect(()=>{
        axios.get(URL+"/user/getall").then(result=>setUsers(result.data))
        .catch(error=>console.log(error))
    })


  return (
    
    <div className='d-flex vh-100 bg-primary align-items-center justify-content-center md:px[200px] py-4'>
    <p className='flex font-extrebold'>
        <h1 className='text-3xl font-bold underline'>User CRUD Task</h1>
        </p>    
      <div className='w-90 bg-green rounded p-3 my-4'>
      <Link to="/create" className="inline-block px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">Add User</Link>
</div>
<div>
        <table className='min-w-full divide-y divide-gray-200'>
  <thead className='bg-gray-500'>
    <tr>
      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Name</th>
      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Email</th>
      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Password</th>
      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Actions</th>
    </tr>
  </thead>
  <tbody className='bg-white divide-y divide-gray-200'>
    {
      users.map((user) => {
        return (
          <tr key={user._id}>
            <td className='px-6 py-4 whitespace-nowrap'>{user.username}</td>
            <td className='px-6 py-4 whitespace-nowrap'>{user.email}</td>
            <td className='px-6 py-4 whitespace-nowrap'>{user.password}</td>
            <td className='px-6 py-4 whitespace-nowrap'>
              <Link to={`/update/${user._id}`} className='text-blue-500 hover:underline mr-2'>Update</Link>
              <button className='px-4 py-2 bg-red-500 text-white rounded'
                onClick={() => handledelete(user._id)}>Delete</button>
            </td>
          </tr>
        )
      })
    }
  </tbody>
</table>


      </div>
    </div>
  )
}

export default User