import DataTable from '@/components/common/DataTable';
import { getSubAdmins } from '@/utils/axios-instance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowDownUp } from 'lucide-react';
import AddSubAdmin from './AddSubAdmin';
import EditSubAdminButton from './EditSubAdmin';
import DeleteSubAdmin from './DeleteSubAdmin';

const SubAdminDetails = () => {
  const [subAdmins, setSubAdmins] = useState([]);
  const [render, setRender] = useState(false);
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
        <div className='w-fit p-2 rounded mx-auto'>
          {row.original.parentCategory ? row.original.parentCategory : <strong>Not Assigned</strong>}
        </div>
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
            <EditSubAdminButton
              isEditMode={true}
              initialValues={row.original}
              setRender={setRender}
              render={render}
            />
            <DeleteSubAdmin
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
    try {
      const { data } = await getSubAdmins();
      setSubAdmins(data);
    } catch (error) {
      toast.error(`Error : ${error}`);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [render]);
  return (
    <div>
      <div className='my-4 flex justify-end'>
        <AddSubAdmin setRender={setRender} render={render} />
      </div>
      <DataTable data={subAdmins} columns={subAdminColumn} />
    </div>
  );
};

export default SubAdminDetails;
