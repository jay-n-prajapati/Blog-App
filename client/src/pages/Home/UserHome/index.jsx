import BlogCard from "@/components/common/BlogCard"
import { getBlogs } from "@/utils/axios-instance"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const UserHome = () => {
  const [blogs , setBlogs] = useState([])

  const fetchBlogs = async () =>{
    const {data:blogs , error } = await getBlogs();
   
     error ? toast.error(`Error : ${error} `) : setBlogs(blogs);
    
  }
  useEffect(() =>{
    fetchBlogs()
  },[])
  return (
    <div>
     {
      blogs.map( blog =>{
        return <BlogCard key={blog.id} blog={blog} />
      })
     }
    </div>
  )
}

export default UserHome
