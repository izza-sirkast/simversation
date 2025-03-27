import React, { JSX } from 'react'
import { User } from '../../types.ts'
import { useAuth } from './AuthContext.tsx'
import { Navigate } from 'react-router'

type Props = {
    children: JSX.Element
}

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

export default ProtectedRoute