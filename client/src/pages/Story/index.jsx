import BlogCard from '@/components/common/BlogCard';
import DeleteButton from '@/components/common/DeleteBlogButton';
import HelmetHeader from '@/components/common/HelmetHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getUsersBlogs } from '@/utils/axios-instance';
import useRole from '@/utils/custom-hooks/useRole';
import useSearch from '@/utils/custom-hooks/useSearch';
import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Story = () => {
  const { currentUser } = useRole();
  const [userBlogs, setUserBlogs] = useState([]);
  const fieldsToSearch = useMemo(
    () => ['title', 'briefDescription', 'parentCategory', 'subCategory'],
    [],
  );
  const { filteredData, searchQuery, setSearchQuery } = useSearch(userBlogs, fieldsToSearch);

  const fetchUserBlogs = async () => {
    const { success, data, error } = await getUsersBlogs(currentUser.id);
    if (!success) console.log(error);
    setUserBlogs(data);
  };

  useEffect(() => {
    fetchUserBlogs();
  }, [currentUser.publishedBlogs]);

  return (
    <>
      <HelmetHeader title='Stories' />
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
              <div className='flex flex-col gap-4'>
                <div>
                  <Input
                    placeholder='search stories here..'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='text-xs sm:text-sm'
                  />
                </div>
                {filteredData.length === 0 ? (
                  <div>No data found..</div>
                ) : (
                  <div className='flex flex-col gap-3'>
                    {filteredData.map((blog) => {
                      return (
                        <BlogCard key={blog.id} blog={blog}>
                          <DeleteButton blog={blog} />
                        </BlogCard>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Story;
