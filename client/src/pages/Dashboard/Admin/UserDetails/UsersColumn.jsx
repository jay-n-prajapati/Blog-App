import CommonAvatar from '@/components/common/Avatar';
import { ArrowDownUp } from 'lucide-react';
import DeleteUserButton from './DeleteUserButton';

export const usersColumn = [
  {
    id: 'avatar',
    cell: ({ row }) => {
      return <CommonAvatar userName={row.original.name} />;
    },
  },
  {
    header: (
      <div className='flex gap-1 items-center'>
        id
        <ArrowDownUp className='ml-2 h-4 w-4' />
      </div>
    ),
    accessorKey: 'id',
  },
  {
    header: (
      <div className='flex gap-1 items-center'>
        Name
        <ArrowDownUp className='ml-2 h-4 w-4' />
      </div>
    ),
    accessorKey: 'name',
  },
  {
    header: (
      <div className='flex gap-1 items-center'>
        Email
        <ArrowDownUp className='ml-2 h-4 w-4' />
      </div>
    ),
    accessorKey: 'email',
  },
  {
    header: (
      <div className='flex gap-1 items-center'>
        Password
        <ArrowDownUp className='ml-2 h-4 w-4' />
      </div>
    ),
    accessorKey: 'password',
  },
  {
    header: (
      <div className='flex gap-1 items-center justify-center'>
        Published Blogs
        <ArrowDownUp className='ml-2 h-4 w-4' />
      </div>
    ),
    accessorKey: 'publishedBlogs',
    cell: ({ row }) => <div className='w-fit mx-auto'>{row.original.publishedBlogs.length}</div>,
    sortingFn: (rowA, rowB) => {
      return rowA.original.publishedBlogs.length - rowB.original.publishedBlogs.length;
    },
  },
  {
    header: (
      <div className='flex gap-1 items-center justify-center'>
        Saved Blogs
        <ArrowDownUp className='ml-2 h-4 w-4' />
      </div>
    ),
    accessorKey: 'savedBlogs',
    cell: ({ row }) => <div className='w-fit mx-auto'>{row.original.savedBlogs.length}</div>,
    sortingFn: (rowA, rowB) => {
      return rowA.original.savedBlogs.length - rowB.original.savedBlogs.length;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div>
          <DeleteUserButton userId={row.original.id} />
        </div>
      );
    },
  },
];
