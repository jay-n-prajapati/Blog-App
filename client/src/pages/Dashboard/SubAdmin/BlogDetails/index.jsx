import { getSpecificCategoryBlogs } from '@/utils/axios-instance';
import useRole from '@/utils/custom-hooks/useRole';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BlogDetails from '../../BlogsTable';

const BlogIndex = () => {
  const [blogs, setBlogs] = useState([]);
  const { currentUser } = useRole();
  const fetchBlogs = async () => {
    const { success, data, error } = await getSpecificCategoryBlogs(currentUser.parentCategory);
    if (!success) {
      toast.error(`Error : ${error}`);
      return;
    }
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <BlogDetails data={blogs} setData={setBlogs} />
    </>
  );
};

export default BlogIndex;
