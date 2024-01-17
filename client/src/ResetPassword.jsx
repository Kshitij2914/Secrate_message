import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './ResetPassword.css'
function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, token} = useParams()
    
    axios.defaults.withCredentials = true

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(`http://localhost:3001/reset_password/${id}/${token}`, { password })
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
        <div id='resetPassword' className='d-flex justify-content-center align-items-center vh-100'>
            <div id='inner' className=' p-3 rounded w-3'>
                <h3>Reset Password</h3>
                <form onSubmit={handleSubmit}>

                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>New Password</strong>
                        </label>
                        <input
                            type='password' placeholder='new password' autoComplete='off'
                            name='password' className='form-control rounded-3'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type='submit' className='btn btn-secondary w-100 rounded-5'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
