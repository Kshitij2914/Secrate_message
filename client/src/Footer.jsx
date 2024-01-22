import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Footer.css'

function Footer({ callData }) {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const temp1 = localStorage.getItem('id')
    setId(temp1)
    const temp2 = localStorage.getItem('name')
    setName(temp2)
    callData()
  }, ([]))

  function handleSend() {
    setId(localStorage.getItem('id'))
    setName(localStorage.getItem('name'))
    axios.post('https://secrate-message.vercel.app/home', { name, id, message })
      .then(result => {
        if (result.data == "over"){
          alert("over")
        }
        else {
          console.log(result)
          callData()
        }
      })
      .catch(err => console.log(err))
    setMessage("")
  }
  return (
    <div>
      <div className='component'>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={handleSend}>send</button>
      </div>
    </div>

  )
}

export default Footer
