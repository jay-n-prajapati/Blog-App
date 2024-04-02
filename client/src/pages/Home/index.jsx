import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const { user, admin, subAdmin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    admin
      ? navigate('/admin-users')
      : subAdmin
      ? navigate('/subAdmin-blogs')
      : user
      ? navigate('/home')
      : null;
  }, []);

  return (
    <div className='h-full w-full bg-slate-300'>
      <div className='h-[25rem] md:h-[30rem] bg-[#fec117] flex sm:pl-6'>
        <div className='w-full px-6 md:px-0 md:pr-6 md:w-[55%] flex md:items-start justify-center flex-col gap-4'>
          <h1 className='font-sohne-semibold font-medium text-[3.5rem] lg:text-[4rem] md:text-[4.5rem]'>Stay Curious.</h1>
          <p className='text-lg md:text-xl'>
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <div>
            <Button className='rounded-3xl text-[12px] md:text-sm border border-transparent bg-black font-sohne-regular px-6 hover:text-black hover:bg-transparent hover:border hover:border-black'>
              Start Writing
            </Button>
          </div>
        </div>
        <div className='h-full w-[45%]  hidden md:block'>
          <img src='/images/blogify-landing-img.jpg' alt='landing-img' className='h-full w-full grayscale' />
        </div>
      </div>
    </div>
  );
};

export default Landing;
