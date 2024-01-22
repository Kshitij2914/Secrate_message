import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import Footer from './Footer'
import Box from './Box'

function Home({callData, data}) {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get('https://secrate-message.vercel.app/home')
      .then(result => {
        console.log(result)
        callData()
        if(result.data !== "Success"){
          navigate('/Login')
        }
      })
      .catch(err => console.log(err))

      let tim = setInterval(()=>{
        callData();
      },1000)
      return () => {
        clearInterval(tim)
      }
  }, ([]))
  
  return (
    <div>
      <Header />
      <Box data={data}/>
      <Footer callData={callData}/>
    </div>
  )
}

export default Home
