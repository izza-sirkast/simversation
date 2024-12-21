import { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

function Posts() {
    const [postsData, setPostsData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
        setPostsData(response.data)
        })
    }, [])


  return (
    <>
        <div className="p-5 grid sm:grid-cols-2 md:grid-cols-3 auto-rows-[250px] gap-4 ">
            {postsData.map((post, key) => {
                return (
                    <div key={post.id} className="flex flex-col justify-between items-start overflow-hidden p-6 bg-white border border-gray-400 rounded-lg shadow ">
                        <div>
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{post.title}</h5>
                            </a>
                            <p className="max-h-[110px] overflow-hidden mb-3 font-normal text-gray-700">{post.post_text}</p>
                        </div>
                        <Link to={`byId/${post.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 ">
                            Read more
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </Link>
                    </div>

                )
            })}
        </div>
    </>
  )
}

export default Posts