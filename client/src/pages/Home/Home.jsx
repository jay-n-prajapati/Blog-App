import BlogCard from '@/components/common/BlogCard';
import LikeButton from '@/components/common/LikeButton';
import { getBlogs } from '@/utils/axios-instance';
import useRole from '@/utils/custom-hooks/useRole';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UserHome = () => {
  const [blogs, setBlogs] = useState([]);
  const { currentUser } = useRole();

  const fetchBlogs = async () => {
    const { data: blogs, error } = await getBlogs(currentUser.id);

    error ? toast.error(`Error : ${error} `) : setBlogs(blogs);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  
  return (
    <div>
      {blogs.map((blog) => {
        return <BlogCard key={blog.id} blog={blog}>
          <LikeButton likes={blog.likes} />
        </BlogCard>;
      })}
    </div>
  );
};

export default UserHome;
