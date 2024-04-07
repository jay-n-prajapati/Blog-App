import CommonAvatar from '@/components/common/Avatar';
import { Button } from '@/components/ui/button';
import { ArrowDownUp } from 'lucide-react';

export const usersColumn = [
  {
    id: 'avatar',
    cell: ({ row }) => {
      return <CommonAvatar userName={row.getValue('name')} />;
    },
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
    cell: ({ row }) => <div className='w-fit mx-auto'>{row.getValue('publishedBlogs').length}</div>,
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
    cell: ({ row }) => <div className='w-fit mx-auto'>{row.getValue('savedBlogs').length}</div>,
    sortingFn: (rowA, rowB) => {
      return rowA.original.savedBlogs.length - rowB.original.savedBlogs.length;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div>
          <Button variant='link' className={`px-0`} size='sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='none'
              stroke='red'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-trash-2'
            >
              <path d='M3 6h18' />
              <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
              <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
              <line x1='10' x2='10' y1='11' y2='17' />
              <line x1='14' x2='14' y1='11' y2='17' />
            </svg>
          </Button>
        </div>
      );
    },
  },
];
