import BlogCard from '@/components/common/BlogCard';
import { getBlogsWithPage, getCategories } from '@/utils/axios-instance';
import useRole from '@/utils/custom-hooks/useRole';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NavLink } from 'react-router-dom';

const UserHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { currentUser } = useRole();

  const fetchBlogs = async () => {
    try {
      const { data: blogs } = await getBlogsWithPage(currentUser.id, page);
      if (blogs && blogs.data.length > 0 && blogs.next !== null) {
        setBlogs((prevBlogs) => [...prevBlogs, ...blogs.data]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
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
    <div className='p-4 sm:p-6'>
      <div className='flex relative'>
        <div className='w-full px-2 sm:border-r sm:w-2/3'>
          <InfiniteScroll
            dataLength={blogs.length}
            next={fetchBlogs}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <div className='flex flex-col gap-4'>
              {blogs.map((blog) => {
                return (
                  <BlogCard key={blog.id} blog={blog}>
                    {/* <LikeButton likes={blog.likes} /> */}
                  </BlogCard>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
        <div className='hidden px-4 sm:block sm:w-[31%] fixed right-6'>
          <div>
            <h1 className='text-lg font-bold'>Topics</h1>
            <div className='flex flex-wrap gap-2 mt-4'>
              {category.map((curr) => {
                return (
                  <NavLink
                    to={`/blogs/${curr.parentCategory}`}
                    key={curr.id}
                    className='text-xs p-2 px-4 bg-[#f2f2f2] rounded-2xl'
                  >
                    <span>{curr.parentCategory}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
