// import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
//import './App.css'
import { Routes, Route } from 'react-router'

import ProtectedRoute from './wrappers/ProtectedRoute'
import Login from './pages/auth-pages/Login'

import Home from './pages/Home/Home'


function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/login" element={<Login type='login' />} />
      <Route path="/register" element={<Login type='register' />} />
    </Routes>
  )
}

export default App
