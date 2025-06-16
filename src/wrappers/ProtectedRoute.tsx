import React, { JSX } from 'react'
import { User } from '../../types.ts'
import { useAuth } from './AuthContext.tsx'
import { Navigate } from 'react-router'
import { Outlet } from 'react-router'

type Props = {
    children: JSX.Element
}

const ProtectedRoute = () => {
  const { user } = useAuth()

  // If user is "default", it means the authentication is still being checked
  if(user === "default"){
    return <div>Loading...</div>
  }

  return (user && user != "default") ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute