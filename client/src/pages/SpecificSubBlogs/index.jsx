import BlogCard from '@/components/common/BlogCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSpecificSubCategoryBlogs } from '@/utils/axios-instance';
import useSearch from '@/utils/custom-hooks/useSearch';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SpecificSubBlogs = () => {
  const { subCategory } = useParams();
  const [blogs, setBlogs] = useState([]);
  const { filteredData, searchQuery, setSearchQuery } = useSearch(blogs, [
    'title',
    'briefDescription',
    'parentCategory',
    'subCategory',
  ]);

  const fetchSpecificBlogs = async () => {
    try {
      const { data } = await getSpecificSubCategoryBlogs(subCategory);
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
      <div className='flex gap-2'>
        <div className='w-full'>
          <div className='pb-4'>
            <h1 className='text-base font-bold sm:text-xl md:text-2xl text-center'>
              Results of {subCategory}
            </h1>
          </div>
          {blogs.length === 0 ? (
            <div className='flex flex-col items-center justify-center mt-4'>
              <p>Oops there is no content..</p>
              <span>
                <NavLink to='/home'>
                  <Button variant='link' className='p-0 h-6'>
                    Go Back
                  </Button>
                </NavLink>
              </span>
            </div>
          ) : (
            <div>
              <div className='mb-4'>
                <Input
                  placeholder='search stories here..'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='text-xs sm:text-sm w-full sm:w-[49%] '
                />
              </div>
              {filteredData.length === 0 ? (
                <div>No data found..</div>
              ) : (
                <div className='block sm:grid grid-cols-2 gap-4'>
                  {filteredData.map((blog) => {
                    return <BlogCard key={blog.id} blog={blog} />;
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecificSubBlogs;
