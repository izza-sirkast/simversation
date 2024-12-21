import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Post() {
    const { id } = useParams()
    const [postObj, setPostObj] = useState({})
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObj(response.data)
        })

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data)
        })
    }, [])

    const submitComment = () => {
        axios.post('http://localhost:3001/comments', {
            comment_body: comment,
            postId: id
        }).then(() => {
            setComments([
                ...comments,
                {comment_body: comment}
            ])
        })

        // Reset comment input
        setComment('')
    }

  return (
    <div className='p-6'> 
        <div className="flex flex-col justify-between items-start overflow-hidden  bg-white">
            <div>
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{postObj.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">{postObj.post_text}</p>
                <p className='mt-5 text-sm'>by : <span className='text-blue-600'>{postObj.username}</span></p>
            </div>
        </div>

        <div className='mt-16 pt-3 border-t border-black '>    
            <h2 className='text-xl font-bold'>Comments</h2>

            <div className='mt-3 w-full mb-4 border border-gray-500 rounded-lg bg-gray-50  '>
                <div className="px-4 py-2 bg-white rounded-t-lg ">
                    <textarea value={comment} onChange={e => setComment(e.target.value)}  id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0  focus:ring-0 " placeholder="Write a comment..."></textarea>
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t ">
                    <button onClick={submitComment} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 -900 hover:bg-blue-800">
                        Post comment
                    </button>
                </div>
            </div>

            <div>
                {comments.map((comment, key) => {
                    return (
                        <div key={key} className='mt-3 w-full mb-4 border border-gray-500 rounded-lg px-4 py-2 '>
                            <p className='text-sm'>{comment.comment_body}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Post