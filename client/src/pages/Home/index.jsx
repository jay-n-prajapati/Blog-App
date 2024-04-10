import BlogCard from '@/components/common/BlogCard';
import { Button } from '@/components/ui/button';
import { getAllBlogs } from '@/utils/axios-instance';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Landing = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const { data } = await getAllBlogs();
      const latestBlogs = data.slice(-10).reverse();
      setBlogs(latestBlogs);
    } catch ({ error }) {
      toast.error(`Error : ${error}`);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    isAuth ? navigate('/home') : null;
  }, []);

  return (
    <div className='h-full w-full'>
      <div className='h-[25rem] md:h-[30rem] bg-[#fec117] flex sm:pl-6'>
        <div className='w-full px-6 md:px-0 md:pr-6 md:w-[55%] flex md:items-start justify-center flex-col gap-4'>
          <h1 className='font-sohne-semibold font-medium text-[3.5rem] lg:text-[4rem] md:text-[4.5rem]'>
            Stay Curious.
          </h1>
          <p className='text-lg md:text-xl'>
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <div>
            <NavLink to='/auth'>
              <Button className='rounded-3xl text-[12px] md:text-sm border border-transparent bg-black font-sohne-regular px-6 hover:text-black hover:bg-transparent hover:border hover:border-black'>
                Start Reading
              </Button>
            </NavLink>
          </div>
        </div>
        <div className='h-full w-[45%]  hidden md:block'>
          <img
            src='/images/blogify-landing-img.jpg'
            alt='landing-img'
            className='h-full w-full brightness-50'
          />
        </div>
      </div>
      <div className='p-6 pb-0'>
        <div className='mb-4'>
          <h1 className=' text-xl sm:text-2xl md:text-3xl font-bold'>Latest Releases</h1>
        </div>
        <div className='block  md:grid md:grid-cols-2 gap-4'>
          {blogs &&
            blogs.map((blog) => {
              return <BlogCard key={blog.id} blog={blog} />;
            })}
        </div>
        <div className='flex justify-center mt-2'>
          <NavLink to='/auth'>
            <Button variant='link' size='lg'>
              Explore More
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Landing;
