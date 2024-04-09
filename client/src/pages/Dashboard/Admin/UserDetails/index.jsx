import DataTable from '@/components/common/DataTable';
import { getUsers } from '@/utils/axios-instance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CommonAvatar from '@/components/common/Avatar';
import { ArrowDownUp } from 'lucide-react';
import DeleteUser from './DeleteUser';


const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const { success, data, error } = await getUsers();
    if (!success) {
      toast.error(`Error : ${error}`);
      return;
    }
    setUsers(data);
  };
  const usersColumn = [
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
      id: 'actions',
      cell: ({ row }) => {
        return (
          
          <div>
            <DeleteUser users={users} setUsers={setUsers} currentUser={row.original} />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <DataTable data={users} columns={usersColumn} />
    </div>
  );
};

export default UserDetails;
