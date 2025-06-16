import react, { createContext, useContext, useEffect, useState } from 'react'
import { API } from '../configs/api.ts'
import { useNavigate } from 'react-router'
import { User, AuthContextType } from '../../types.ts'

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: react.ReactNode}) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getProfile = async () => {
      API.get('/users/profile')
        .then(res => {
          setUser(res.data)
        })
        .catch(() => {
          setUser(null)
        })
    }
    getProfile()
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await API.post('/users/login', { username, password})
      const { data } = await API.get('/users/profile')
      setUser({ user_id: data.user_id, username: data.username })
      navigate('/')
    } catch (error) {
      alert('Invalid username or password')
    }
  }

  const logout = async () => {
    await API.post('/users/logout')
    setUser(null)
    navigate('/login')
  }

  const register = async (username : string, password : string) => {
    try {
      await API.post('/users/register', { username, password})
      alert('User registered successfully')
      navigate('/login')
    } catch (error : any) {
      // If username already exists
      if(error.response.data.err_id == 1){
        alert('Username already exists')
        return
      }
      alert('Internal server error')
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}