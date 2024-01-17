import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import ForgetPassword from './ForgetPassword'
import ResetPassword from './ResetPassword'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([])
  function callData()
  {
    axios.get('http://localhost:3001/')
      .then(result => {
        setData(result.data)
      })
      .catch(err => console.log(err))
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home callData={callData} data={data} />}></Route>
        <Route path='/forget_password' element={<ForgetPassword />}></Route>
        <Route path='/reset_password/:id/:token' element={<ResetPassword />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
