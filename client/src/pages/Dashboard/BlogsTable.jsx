import DataTable from '@/components/common/DataTable';
import CommonAvatar from '@/components/common/Avatar';
import { ArrowDownUp } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import DeleteBlog from './DeleteBlog';
import PropTypes from 'prop-types'


const BlogDetails = ({ data , setData }) => {
  const blogsColumn = [
    {
      id: 'avatar',
      cell: ({ row }) => {
        return <CommonAvatar userName={row.original.author} />;
      },
    },
    {
      header: (
        <div className='flex gap-1 items-center'>
          Author
          <ArrowDownUp className='ml-2 h-4 w-4' />
        </div>
      ),
      accessorKey: 'author',
    },
    {
      header: (
        <div className='flex gap-1 items-center'>
          Blog title
          <ArrowDownUp className='ml-2 h-4 w-4' />
        </div>
      ),
      accessorKey: 'title',
      cell: ({ row }) => {
        return (
          <div className='max-w-40'>
            <NavLink to={`/blog/${row.original.id}`}>
              <strong className='line-clamp-1'> {row.original.title}</strong>
            </NavLink>
          </div>
        );
      },
    },
    {
      header: (
        <div className='flex gap-1 items-center'>
          Category
          <ArrowDownUp className='ml-2 h-4 w-4' />
        </div>
      ),
      accessorKey: 'parentCategory',
    },
    {
      header: (
        <div className='flex gap-1 items-center'>
          Sub Category
          <ArrowDownUp className='ml-2 h-4 w-4' />
        </div>
      ),
      accessorKey: 'subCategory',
      cell : ({row}) =>{
        return <div>{row.original.subCategory ? row.original.subCategory : <strong>Not Exist</strong>}</div>
      }
    },
    {
      header: (
        <div className='flex gap-1 items-center'>
          Published On
          <ArrowDownUp className='ml-2 h-4 w-4' />
        </div>
      ),
      accessorKey: 'published',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className='flex gap-3'>
            <DeleteBlog blog={row.original} blogs={data} setBlogs={setData} />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable data={data} columns={blogsColumn} />
    </div>
  );
};

BlogDetails.propTypes = {
  data : PropTypes.array,
  setData : PropTypes.func
}

export default BlogDetails;
