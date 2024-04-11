import { getSingleCategories } from '@/utils/axios-instance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DataTable from '@/components/common/DataTable';
import { ArrowDownUp } from 'lucide-react';
import useRole from '@/utils/custom-hooks/useRole';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import EditSubCategory from './EditSubCategory';

const CategoryDetails = () => {
  const [category, setCategory] = useState([]);
  const [render, setRender] = useState(false);
  const { currentUser } = useRole();

  const categoryColumn = [
    {
      header: (
        <div className='flex gap-1 items-center'>
          Assigned Category
          <ArrowDownUp className='ml-2 h-4 w-4' />
        </div>
      ),
      accessorKey: 'parentCategory',
      cell: ({ row }) => (
        <div className='w-fit p-2 rounded mx-auto'>
          {row.original.parentCategory ? (
            row.original.parentCategory
          ) : (
            <strong>Not Assigned</strong>
          )}
        </div>
      ),
    },
    {
      header: (
        <div className='flex gap-1 items-center justify-center'>
          Sub Category
          <ArrowDownUp className='ml-2 h-4 w-4' />
        </div>
      ),
      accessorKey: 'subCategories',
      cell: ({ row }) => (
        <div className='w-fit mx-auto'>
          {row.original.subCategories.length === 0 ? (
            <strong>Not Exist</strong>
          ) : (
            <>
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
            </>
          )}
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className='flex gap-4 justify-end pr-8'>
            <EditSubCategory
              isEditMode={true}
              initialValues={row.original.subCategories}
              id={row.original.id}
              render={render}
              setRender={setRender}
            />
          </div>
        );
      },
    },
  ];

  const fetchCategory = async () => {
    try {
      const { data } = await getSingleCategories(currentUser.parentCategory);
      setCategory(data);
    } catch (error) {
      toast.error(`Error : ${error}`);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [render]);
  return (
    <div>
      <DataTable data={category} columns={categoryColumn} />
    </div>
  );
};

export default CategoryDetails;
