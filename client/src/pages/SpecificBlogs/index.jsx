import BlogCard from '@/components/common/BlogCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSingleCategories, getSpecificCategoryBlogs } from '@/utils/axios-instance';
import useSearch from '@/utils/custom-hooks/useSearch';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SpecificBlogs = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { filteredData, searchQuery, setSearchQuery } = useSearch(blogs, [
    'title',
    'briefDescription',
    'parentCategory',
    'subCategory',
  ]);

  const fetchSpecificBlogs = async () => {
    try {
      const { data } = await getSpecificCategoryBlogs(category);
      setBlogs(data);
    } catch (error) {
      toast.error(`Error : ${error}`);
    }
  };
  const fetchSubCategories = async () => {
    try {
      const { data } = await getSingleCategories(category);
      setSubCategories(data[0].subCategories);
    } catch ({ error }) {
      toast.error(`Error : ${error}`);
    }
  };

  useEffect(() => {
    fetchSpecificBlogs();
    fetchSubCategories();
  }, []);

  return (
    <div className=' p-4 sm:p-6'>
      <div className='w-full'>
        <div className='pb-4'>
          <h1 className='text-base font-bold sm:text-xl md:text-2xl text-center'>
            Results of {category}
          </h1>
        </div>
        {blogs.length === 0 ? (
          <div className='flex flex-col items-center justify-center mt-4 w-full'>
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
          <div
            className={`flex gap-4 w-full ${
              subCategories.length === 0 ? 'justify-center' : 'justify-start'
            }`}
          >
            <div className={`flex flex-col min-w-[50rem]`}>
              <div className='mb-4 w-full'>
                <Input
                  placeholder='search stories here..'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='text-xs sm:text-sm w-full'
                />
              </div>
              {filteredData.length === 0 ? (
                <div>No data found..</div>
              ) : (
                <div className='flex flex-col gap-2'>
                  {filteredData.map((blog) => {
                    return <BlogCard key={blog.id} blog={blog} />;
                  })}
                </div>
              )}
            </div>
            {subCategories.length !== 0 ? (
              <div className='hidden px-4 md:block min-w-48'>
                <div>
                  <h1 className='text-lg font-bold'>Related Topics</h1>
                  <div className='flex flex-wrap gap-2 mt-4'>
                    {subCategories.map((subCategory, idx) => {
                      return (
                        <NavLink
                          to={`/blogs/subCategory/${subCategory}`}
                          key={idx}
                          className='text-xs p-2 px-4 bg-[#f2f2f2] rounded-2xl'
                        >
                          <span>{subCategory}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificBlogs;
