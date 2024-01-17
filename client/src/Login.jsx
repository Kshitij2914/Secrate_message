import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css';

function Signup() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true
    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                if (result.data[0] === "Success") {
                    //localstorage because sometime cookies are denied 
                    localStorage.setItem('id', result.data[1]);
                    localStorage.setItem('name', result.data[2]);
                    navigate('/home')
                }
                else {
                    console.log("failed")
                    alert(result.data)
                }
            })
            .catch(err => console.log(err))

    }
    return (
        <div id="login" className='d-flex justify-content-center align-items-center  vh-100' >
            <div id='innerBox' className='p-4 rounded w-5' >
                <h1>Login</h1><br />
                <form onSubmit={handleSubmit}>

                    <div className='mb-3'>
                        <h5>Email</h5>
                        <input id='email'
                            type='email' placeholder='enter email' autoComplete='off'
                            name='email' className='form-control rounded-2'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='mb-5'>
                        <h5>Password</h5>
                        <input id='password'
                            type='password' placeholder='password' autoComplete='off'
                            name='email' className='form-control rounded-2 '
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button id='button' type='submit' className='btn w-100 rounded-5'>Login</button>
                </form>
                <Link className='link' to='/forget_password'>forget password</Link>
                <p>Doesn't have an account click, <Link className='link' to='/'>Register</Link></p>
            </div>
        </div>
    )
}

export default Signup
