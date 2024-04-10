import BlogCard from '@/components/common/BlogCard';
import { Button } from '@/components/ui/button';
import { getSpecificCategoryBlogs } from '@/utils/axios-instance';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SpecificBlogs = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);

  const fetchSpecificBlogs = async () => {
    try {
      const { data } = await getSpecificCategoryBlogs(category);
      setBlogs(data);
    } catch (error) {
      toast.error(`Error : ${error}`);
    }
  };

  useEffect(() => {
    fetchSpecificBlogs();
  }, []);

  return (
    <div className=' p-4 sm:p-6'>
      <div>
        <div className='py-4'>
          <h1 className='text-lg font-bold sm:text-xl md:text-2xl'>Results of {category}</h1>
        </div>
        {blogs.length === 0 ? (
          <div className='flex flex-col items-center justify-center mt-4'>
            <p>Oops there is no content..</p>
            <span>
              <NavLink to='/home'>
                <Button variant='link' className='p-0 h-6'>Go Back</Button>
              </NavLink>
            </span>
          </div>
        ) : (
          <div className='block md:grid md:grid-cols-2 gap-2'>
            {blogs.map((blog) => {
              return <BlogCard key={blog.id} blog={blog} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificBlogs;
