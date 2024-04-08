import DataTable from '@/components/common/DataTable';
import { getSubAdmins } from '@/utils/axios-instance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowDownUp } from 'lucide-react';
import DeleteSubAdminButton from './DeleteSubAdminButton';
import AddSubAdmin from './AddSubAdmin';

const SubAdminDetails = () => {
  const [subAdmins, setSubAdmins] = useState([]);
  const subAdminColumn = [
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
            <DeleteSubAdminButton
              subAdmin={row.original}
              subAdmins={subAdmins}
              setSubAdmins={setSubAdmins}
            />
          </div>
        );
      },
    },
  ];

  const fetchUsers = async () => {
    const { success, data, error } = await getSubAdmins();
    if (!success) {
      toast.error(`Error : ${error}`);
      return;
    }
    setSubAdmins(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <div className='my-4 flex justify-end'>
        <AddSubAdmin setSubAdmins={setSubAdmins} />
      </div>
      <DataTable data={subAdmins} columns={subAdminColumn} />
    </div>
  );
};

export default SubAdminDetails;
