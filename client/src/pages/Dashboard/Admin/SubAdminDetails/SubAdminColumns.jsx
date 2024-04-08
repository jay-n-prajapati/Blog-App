import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowDownUp } from 'lucide-react';

export const subAdminColumn = [
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
        Category
        <ArrowDownUp className='ml-2 h-4 w-4' />
      </div>
    ),
    accessorKey: 'parentCategory',
    cell: ({ row }) => (
      <div className='w-fit p-2 rounded mx-auto'>{row.original.parentCategory}</div>
    ),
  },
  {
    header: (
      <div className='flex gap-1 items-center justify-center'>
        SubCategories
        <ArrowDownUp className='ml-2 h-4 w-4' />
      </div>
    ),
    accessorKey: 'subCategories',
    cell: ({ row }) => (
      <div className='w-fit mx-auto'>
        <Select>
          <SelectTrigger className='text-primary-text h-9 text-[10px] sm:text-xs md:text-sm'>
            <SelectValue placeholder={row.original.subCategories[0]} />
          </SelectTrigger>
          <SelectContent>
            {row.getValue('subCategories').map((option, idx) => (
              <SelectItem
                key={idx}
                value={option}
                className='text-primary-text text-[10px] sm:text-xs md:text-sm'
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className='flex gap-3'>
          <Button variant='link' className={`px-0`} size='sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-pencil'
            >
              <path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' />
              <path d='m15 5 4 4' />
            </svg>
          </Button>
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
