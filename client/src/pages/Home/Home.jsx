import BlogCard from '@/components/common/BlogCard';
import { getBlogsWithPage, getCategories } from '@/utils/axios-instance';
import useRole from '@/utils/custom-hooks/useRole';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NavLink } from 'react-router-dom';
import HelmetHeader from '@/components/common/HelmetHeader';

const UserHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { currentUser } = useRole();

  const fetchBlogs = async () => {
    try {
      const { data: blogs } = await getBlogsWithPage(currentUser.id, page);
      if (blogs && blogs.length > 0) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setBlogs((prevBlogs) => [...prevBlogs, ...blogs]);
      setPage((prevPage) => prevPage + 1);
    } catch ({ error }) {
      toast.error(`Error : ${error}`);
      setHasMore(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategory(data);
    } catch ({ error }) {
      toast.error(`Error : ${error}`);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  return (
    <>
    <HelmetHeader title='Home' />
    <div className='p-4 sm:p-6'>
      <div className='flex relative'>
        <div className='w-full px-2 sm:border-r sm:w-2/3'>
          <InfiniteScroll
            dataLength={blogs.length}
            next={fetchBlogs}
            hasMore={hasMore}
          >
            <div className='flex flex-col gap-4'>
              {blogs.map((blog) => {
                return <BlogCard key={blog.id} blog={blog} />;
              })}
            </div>
          </InfiniteScroll>
        </div>
       { category.length !== 0 ? (<div className='hidden px-4 sm:block sm:w-[31%] fixed right-6'>
          <div>
            <h1 className='text-lg font-bold'>Recommended Topics</h1>
            <div className='flex flex-wrap gap-2 mt-4'>
              {category.map((curr) => {
                return (
                  <NavLink
                    to={`/blogs/category/${curr.parentCategory}`}
                    key={curr.id}
                    className='text-xs p-2 px-4 bg-[#f2f2f2] rounded-2xl'
                  >
                    <span>{curr.parentCategory}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>) : null}
      </div>
    </div>
    </>
  );
};

export default UserHome;
