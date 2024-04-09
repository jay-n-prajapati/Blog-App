import { ArrowDownUp } from 'lucide-react';
import DeleteUserButton from '../UserDetails/DeleteUser';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const categoryColumn = [
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
        Sub Categories
      </div>
    ),
    accessorKey: 'subCategories',
    cell: ({ row }) => (
      <div className='w-fit'>
        <Select>
          <SelectTrigger className='text-primary-text h-9 text-[10px] sm:text-xs md:text-sm'>
            <SelectValue placeholder={row.getValue('subCategories')[0]} />
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
        <div>
          <DeleteUserButton userId={row.original.id} />
        </div>
      );
    },
  },
];
