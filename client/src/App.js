import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./Componants/Home"
import Chat from './Componants/Chat'
import "./index.css"

function App() {
  return (
    <div className='app'>
    <Routes>
      <Route index element={<Home />} />
      <Route path='chat' element={<Chat />} />
    </Routes>
    </div>
  )
}

export default App