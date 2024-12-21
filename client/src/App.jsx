import { Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Posts from './pages/posts/Posts'
import CreateNewPost from './pages/posts/CreateNewPost'
import Post from './pages/posts/Post'

function App() {  
  return (
    <>
      <div className='p-4 border-b border-gray-500 top-0 sticky bg-white z-10'>
        <Link to="/" className='mr-4 text-blue-600'>Home</Link>
        <Link to="/posts" className='mr-4 text-blue-600'>Posts</Link>
        <Link to="/posts/new" className='text-blue-600'>Create a Post</Link>
      </div>

      <Routes className=''>
        <Route path="/" element={<Home />} />
        <Route path="/posts" >
          <Route index element={<Posts />} />
          <Route path="new" element={<CreateNewPost />} />
          <Route path="byId/:id" element={<Post />} />
        </Route>
      </Routes>

      <div className='h-screen'></div>
    </>
  )
}

export default App
