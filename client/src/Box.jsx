import React, { useEffect, useState } from 'react'
import ReactScrollToBottom from "react-scroll-to-bottom";
import './Box.css'
import Message from './Message';

function Box({data}) {
  const myId = localStorage.getItem('id')

  return (
    <div className='box'>
      <ReactScrollToBottom className='box'>
            {
              data.map(data=>
                <h3 key={data.name+data.message}><Message id= { myId === data.id?'':data.id} name={data.name} message={data.message} /></h3>                  
              )
            }
      </ReactScrollToBottom>
    </div>
  )
}

export default Box
