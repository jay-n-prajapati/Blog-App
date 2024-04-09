import { getCategories } from '@/utils/axios-instance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { categoryColumn } from './CategoryColumns';
import DataTable from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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
        <Button size='sm'>
          <Plus/>
          Add New
        </Button>
      </div>
      <DataTable data={category} columns={categoryColumn} />
    </div>
  );
};

export default CategoryDetails;
