import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './ForgetPassword.css'
function ForgetPassword() {
    const [email, setEmail] = useState()
    const navigate = useNavigate()
    
    axios.defaults.withCredentials = true

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('https://secrate-message.vercel.app/forget_password', { email })
            .then(result => {
                if (result.data === "Success") {
                    navigate('/login')
                }
                else{
                    alert("No record exist")
                }
            })
            .catch(err => console.log("NOT"))
    }
    return (
        <div id='forgetPassword' className='d-flex justify-content-center align-items-center  vh-100'>
            <div id='inner' className=' p-4 rounded'>
                <h2>Forget Password</h2>
                <form onSubmit={handleSubmit}>

                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <h4>email</h4>
                        </label>
                        <input id='input'
                            type='email' placeholder='enter email' autoComplete='off'
                            name='email' className='form-control rounded-3'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button id='getCode' type='submit' className='btn btn-success w-100 rounded-5'>Get Code</button>
                </form>
                <p>back, <Link id='link'  style={{textDecoration: 'none'}} to='/'>click</Link></p>
            </div>
        </div>
    )
}

export default ForgetPassword
