import {useState} from 'react'
import { Link, Navigate } from 'react-router'
import { useAuth } from '../../wrappers/AuthContext'

type Props = {
  type: 'login' | 'register'
}

const Login = ({ type }: Props) => {
  const { user, login, register } = useAuth()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  
  const handleSubmit = async () => {
    if(type == 'login'){
      await login(username, password)
    } else {
      await register(username, password)
    }
  }

  if(user){
    return <Navigate to="/" />
  }

  const linkDest = type == 'login' ? '/register' : '/login'
  return (
    <div className='p-2'>
      <h1>{type == 'login' ? 'Login' : 'Register'}</h1>
      <input className='border border-black mt-2 block' type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className='border border-black mt-2 block' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className='border border-black mt-2 px-2 mr-2 cursor-pointer bg-blue-300 hover:bg-blue-400' onClick={async () => await handleSubmit()}>{type == 'login' ? 'Login' : 'Register'}</button>
      <Link to={linkDest} className='text-blue-600 underline'>{ type == 'login' ? 'register' : 'login'}</Link>
    </div>
  )
}

export default Login