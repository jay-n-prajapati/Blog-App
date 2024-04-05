import { useCallback, useEffect, useState } from 'react';
import Editor from './Editor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addPublishedBlog, getCategories, postBlog } from '@/utils/axios-instance';
import { Button } from '@/components/ui/button';
import Form from '@/components/common/Form';
import { toast } from 'react-toastify';
import useRole from '@/utils/custom-hooks/useRole';
import { useNavigate } from 'react-router-dom';

const Write = () => {
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('');
  const { currentUser, endPoint } = useRole();
  const navigate = useNavigate();

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
    if (
      !blog.title ||
      !blog.briefDescription ||
      !blog.detailedBlog ||
      !blog.parentCategory ||
      !blog.subCategory
    ) {
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
    };
    const { data, error } = await postBlog(blogToPost);
    if (error) {
      toast.error(`Error : ${error}`);
    }
    toast.success('Blog published Successfully');
    currentUser.publishedBlogs.push(data.id);
    const res = await addPublishedBlog(currentUser.id, endPoint, {
      publishedBlogs: currentUser.publishedBlogs,
    });
    console.log(res);
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
    <div className='p-2'>
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
            {parentCategory ? (
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
          <div>
            <Button size='lg' type='submit' className='rounded-3xl'>
              Publish
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Write;
