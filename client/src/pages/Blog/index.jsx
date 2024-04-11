import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleBlogs } from '@/utils/axios-instance';
import { toast } from 'react-toastify';
import parse from 'html-react-parser';
import './blog.css';
import CommonAvatar from '@/components/common/Avatar';
import SaveButton from '@/components/common/SaveButton';
import HelmetHeader from '@/components/common/HelmetHeader';


const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchSingleBlog = async () => {
    try {
      const { data } = await getSingleBlogs(id);
      setBlog(...data);
    } catch ({ error }) {
      toast.error(`Error : ${error}`);
    }
  };

  useEffect(() => {
    fetchSingleBlog();
  }, []);

  return (
    <>
    <HelmetHeader title='Blogify' />
    <div className='p-4 sm:p-6'>
      <div className='mx-auto max-w-[680px] pt-8'>
        <div>
          <h1 className=' text-2xl sm:text-3xl md:text-4xl font-sohne-semibold mb-4'>
            {blog?.title}
          </h1>
        </div>
        <div>
          <h3 className='text-primary-text text-pretty text-sm sm:text-base md:text-lg mb-4'>
            {blog?.briefDescription}
          </h3>
        </div>
        <div className='my-4'>
          <div className='flex items-center justify-between py-2 border-t border-b'>
            <div className='flex items-center gap-2'>
              <div>
                {blog && <CommonAvatar className='size-7 sm:size-8' userName={blog?.author} />}
              </div>
              <div>
                <div>
                  <h3 className='text-primary-text text-[10px] sm:text-xs'>{blog?.author}</h3>
                </div>
                <div>
                  {blog && (
                    <h3 className='text-primary-text text-[10px] sm:text-xs'>{blog?.published}</h3>
                  )}
                </div>
              </div>
            </div>
            <div className='flex items-center justify-end gap-5'>
              <SaveButton blog={blog} />
            </div>
          </div>
        </div>
        <div className='blog-container'>{blog && parse(blog?.detailedBlog)}</div>
      </div>
    </div>
    </>
  );
};

export default Blog;
