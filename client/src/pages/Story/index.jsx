import BlogCard from '@/components/common/BlogCard';
import DeleteButton from '@/components/common/DeleteButton';
import { Button } from '@/components/ui/button';
import { getUsersBlogs } from '@/utils/axios-instance';
import useRole from '@/utils/custom-hooks/useRole';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux'

const Story = () => {
  const { currentUser , role } = useRole();
  const user = useSelector(state => state.auth.user)
  const [userBlogs, setUserBlogs] = useState([]);
  const fetchUserBlogs = async () => {
    const { data, error } = await getUsersBlogs(currentUser.id);
    if (error) {
      toast.error(`Error : ${error}`);
      return;
    }
    setUserBlogs((prev) => [...prev, ...data]);
  };

  useEffect(() => {
    console.log('mounted..')
    fetchUserBlogs();
  }, []);

  return (
    <div className='p-6'>
      <div className='max-w-[700px] mx-auto '>
        <div className='py-4 my-2'>
          <h1 className='text-xl text-center xsm:text-left sm:text-3xl md:text-4xl font-bold'>
            Your Stories
          </h1>
        </div>
        <div>
          {userBlogs.length === 0 ? (
            <div className='py-4'>
              <p className='text-center text-xs xsm:text-sm'>
                You haven’t published any public stories yet.
              </p>
              <p className='hidden md:block text-center'>
                <NavLink to='/write'>
                  <Button variant='link' size='sm'>
                    Write Story
                  </Button>
                </NavLink>
              </p>
            </div>
          ) : (
            <>
              {userBlogs.map((blog, idx) => {
                return (
                  <BlogCard blog={blog} key={idx}>
                    <DeleteButton blog={blog} />
                  </BlogCard>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Story;
