import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom'

function CreateNewPost() {
    const formik = useFormik({
        initialValues: {
            title: '',
            post_text: '',
            username: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Title is required'),
            post_text: Yup.string()
                .required('Post text is required'),
            username: Yup.string().required('Username is required')
        }),
        onSubmit: values => {
            axios.post('http://localhost:3001/posts', values).then((response) => {
                alert('Post created successfully')
                formik.resetForm()
            })
        }
    })

  return (
    <div className='p-6'>
        <form className='max-w-sm mx-auto' onSubmit={formik.handleSubmit}>
            <div className='mb-5'>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {formik.touched.username && formik.errors.title ? <div className='text-red-600'>{formik.errors.title}</div> : null}
            </div>

            <div className='mb-5'>
                <label htmlFor="post_text" className="block mb-2 text-sm font-medium text-gray-900">Post</label>
                <textarea
                    id="post_text"
                    name="post_text"
                    onChange={formik.handleChange}
                    value={formik.values.post_text}
                    className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {formik.touched.username && formik.errors.post_text ? <div className='text-red-600'>{formik.errors.post_text}</div> : null}
            </div>

            <div className='mb-5'>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {formik.touched.username && formik.errors.username ? <div className='text-red-600'>{formik.errors.username}</div> : null}
            </div>

            <Link to="/posts" class="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-3">back</Link>

            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        </form>


    </div>
  )
}

export default CreateNewPost