import { useCallback, useEffect, useState } from 'react';
import Editor from './Editor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCategories, postBlog } from '@/utils/axios-instance';
import { Button } from '@/components/ui/button';
import Form from '@/components/common/Form';
import { toast } from 'react-toastify';
import { getRole } from '@/utils/services/getRoleService';
import { useSelector } from 'react-redux';

const Write = () => {
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('');
  const {user , admin , subAdmin} = useSelector(state => state.auth)

  const [blog, setBlog] = useState({
    title: '',
    briefDescription: '',
    detailedBlog: '',
    parentCategory: '',
    subCategory: '',
  });

  const handleParentCategoryChange = (value) => {
    setParentCategory(value);
    setBlog({ ...blog, parentCategory: value });
  };

  const findSubCategory = useCallback(() => {
    const category = categories.find((category) => {
      return category.parentCategory === parentCategory;
    });
    return category.subCategories;
  }, [parentCategory]);

  const fetchCategories = async () => {
    const { success, data, error } = await getCategories();
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-GB');
    const blogToPost = {
      ...blog,
      comments : [],
      likes : 0,
      published : currentDate
    }
    // const {success , data , error} = await postBlog(blogToPost);
    // console.log(data.id);
    // if (error) {
    //   toast.error(`Error : ${error}`)
    // }
    // toast.success('Blog published Successfully')
    const currentUser = getRole(user , admin , subAdmin)
    console.log(currentUser);
  };
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
