import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Signup.css'

function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault();
        if (name && email && password) {
            axios.post('http://localhost:3001/register', { name, email, password })
                .then(result => {
                    console.log(result)
                    navigate('/login')
                })
                .catch(err => console.log(err))
        }
        else{
            alert("left something")
        }


    }

    return (
        <div id='signup' className='d-flex justify-content-center  align-items-center vh-100'>
            <div id='innerbox' className=' p-5 rounded-2 w-3'>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>Name</strong>
                        </label>
                        <input
                            type='text' placeholder='enter name' autoComplete='off'
                            name='email' className='form-control rounded-3'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input
                            type='email' placeholder='enter email' autoComplete='off'
                            name='email' className='form-control rounded-3'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>Password</strong>
                        </label>
                        <input
                            type='password' placeholder='password' autoComplete='off'
                            name='email' className='form-control rounded-3'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button id='register' type='submit' className='btn w-100 rounded-5'>Register</button>
                </form>

                <p>Already have an account, click <Link id='link' style={{textDecoration: 'none'}} to='/login' >Login</Link></p>
            </div>
        </div>
    )
}

export default Signup
