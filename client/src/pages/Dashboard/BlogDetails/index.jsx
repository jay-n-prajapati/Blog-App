import DataTable from '@/components/common/DataTable';
import { getBlogs } from '@/utils/axios-instance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useRole from '@/utils/custom-hooks/useRole';
import { blogsColumn } from './BlogColumn';


const BlogDetails = () => {
  const [blogs, setBlogs] = useState([]);
  const {currentUser} = useRole()

  const fetchBlogs = async () => {
    const { success, data, error } = await getBlogs(currentUser.id)
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
    <div>
      <DataTable data={blogs} columns={blogsColumn} />
    </div>
  );
};

export default BlogDetails;
