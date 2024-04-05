import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { getSingleBlogs } from '@/utils/axios-instance';
import {toast} from 'react-toastify'
import parse from 'html-react-parser';
import './blog.css'

const Blog = () => {

  const {id} = useParams()
  const [blog , setBlog] = useState(null);

  const fetchSingleBlog = async () =>{
    const {data, error} = await getSingleBlogs(id);
    !error ? setBlog(...data) : toast.error(`Error : ${error}`)
  }

  useEffect(() =>{
    fetchSingleBlog()
  },[])

  return (
    <div className='p-6'>
      <div className='mx-auto max-w-[680px] pt-8'>
        <div>
          <h1 className=' text-2xl sm:text-3xl md:text-4xl font-sohne-semibold mb-4'>{blog?.title}</h1>
        </div>
        <div>
          <h3 className='text-primary-text text-pretty text-sm sm:text-base md:text-lg mb-4'>{blog?.briefDescription}</h3>
        </div>
        {/* have to add author info  */}
        <div>

        </div>
        <div className='blog-container'>
          {blog && parse(blog?.detailedBlog)}
        </div>
      </div>
    </div>
  )
}

export default Blog
