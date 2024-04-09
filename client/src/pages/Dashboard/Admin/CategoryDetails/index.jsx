import { getCategories } from '@/utils/axios-instance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DataTable from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ArrowDownUp } from 'lucide-react';
import AddEditCategory from '@/components/common/AddEditCategory';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';

const CategoryDetails = () => {
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(false);

  const categoryColumn = [
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
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className='flex gap-4 justify-end pr-8'>
            <EditCategory
              isEditMode={true}
              initialValues={row.original}
              render={render}
              setRender={setRender}
            />
            <DeleteCategory category={row.original} render={render} setRender={setRender} />
          </div>
        );
      },
    },
  ];

  const fetchCategory = async () => {
    try {
      const { data } = await getCategories();
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
      <div className='my-4 flex justify-end'>
        <AddEditCategory open={open} handleOpen={setOpen} render={render} setRender={setRender}>
          <Button size='sm' onClick={() => setOpen(true)}>
            <Plus />
            Add New
          </Button>
        </AddEditCategory>
      </div>
      <DataTable data={category} columns={categoryColumn} />
    </div>
  );
};

export default CategoryDetails;
