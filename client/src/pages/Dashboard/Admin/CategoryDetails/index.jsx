import { getCategories } from '@/utils/axios-instance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { categoryColumn } from './CategoryColumns';
import DataTable from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';

const CategoryDetails = () => {
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    const { success, data, error } = await getCategories();
    if (!success) {
      toast.error(`Error : ${error}`);
      return;
    }
    setCategory(data);
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div>
      <div className='my-4 flex justify-end'>
        <Button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='22'
            height='22'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-plus'
          >
            <path d='M5 12h14' />
            <path d='M12 5v14' />
          </svg>
          Add
        </Button>
      </div>
      <DataTable data={category} columns={categoryColumn} />
    </div>
  );
};

export default CategoryDetails;
