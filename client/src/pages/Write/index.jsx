import { useCallback, useEffect, useState } from 'react';
import Editor from './Editor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCategories, postBlog, updateUser } from '@/utils/axios-instance';
import { Button } from '@/components/ui/button';
import Form from '@/components/common/Form';
import { toast } from 'react-toastify';
import useRole from '@/utils/custom-hooks/useRole';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/actions/authActions';
import { Eye } from 'lucide-react';
import Preview from './Preview';

const Write = () => {
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('');
  const { currentUser, endPoint, role } = useRole();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [blog, setBlog] = useState({
    title: '',
    briefDescription: '',
    detailedBlog: '',
    parentCategory: '',
    subCategory: '',
  });

  const handleParentCategoryChange = (value) => {
    setParentCategory(value);
    setBlog({ ...blog, parentCategory: value, authorId: currentUser.id });
  };

  const findSubCategory = useCallback(() => {
    const category = categories.find((category) => {
      return category.parentCategory === parentCategory;
    });
    return category.subCategories;
  }, [parentCategory]);

  const fetchCategories = async () => {
    const { data, error } = await getCategories();
    !error ? setCategories(data) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blog.title || !blog.briefDescription || !blog.detailedBlog || !blog.parentCategory) {
      toast.warning("Sorry, Can't Publish Some Fields May Empty");
      return;
    }
    const currentDate = new Date().toLocaleDateString('en-GB');
    const blogToPost = {
      ...blog,
      author: currentUser.name,
      comments: [],
      likes: 0,
      published: currentDate,
      savedBy: [],
    };

    const { data, error } = await postBlog(blogToPost);
    if (error) {
      toast.error(`Error : ${error}`);
    }
    toast.success('Blog published Successfully');
    currentUser.publishedBlogs.push(data.id);
    const res = await updateUser(currentUser.id, endPoint, {
      publishedBlogs: currentUser.publishedBlogs,
    });
    navigate('/stories');
    dispatch(setAuth(role, currentUser));
  };

  useEffect(() => {
    if (window.innerWidth < 920) {
      navigate('/no-editor');
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='p-2 relative'>
      <Form handleSubmit={handleSubmit}>
        <Editor blog={blog} setBlog={setBlog} />
        <div>
          <div className='flex gap-4 mb-4'>
            <Select onValueChange={(value) => handleParentCategoryChange(value)}>
              <SelectTrigger className='text-primary-text text-[12px] w-auto md:text-sm'>
                <SelectValue placeholder='Select Category' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category, idx) => (
                  <SelectItem key={idx} value={category.parentCategory}>
                    {category.parentCategory}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {parentCategory && findSubCategory().length !== 0 ? (
              <Select onValueChange={(value) => setBlog({ ...blog, subCategory: value })}>
                <SelectTrigger className={`text-primary-text text-[12px] w-auto md:text-sm`}>
                  <SelectValue placeholder='Select Sub Category' />
                </SelectTrigger>
                <SelectContent>
                  {findSubCategory().map((subCategory, idx) => (
                    <SelectItem key={idx} value={subCategory}>
                      {subCategory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}
          </div>
          <div className='flex justify-between'>
            <Button size='lg' type='submit' className='rounded-3xl'>
              Publish
            </Button>
            <div>
              <Preview blog={blog}>
                <Button
                  size='icon'
                  className='rounded-full size-10'
                  disabled={!blog.title || !blog.briefDescription}
                >
                  <Eye />
                </Button>
              </Preview>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Write;
