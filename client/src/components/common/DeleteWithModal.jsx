import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const DeleteWithModal = ({ title, description, handleDelete }) => {
  const { loader } = useSelector((state) => state.app);

  return (
    <Dialog>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='my-2'>
          <DialogTitle className='text-center text-3xl font-sohne-light'>{title}</DialogTitle>
          <DialogDescription className='text-center text-primary-text text-[14px]'>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className='flex gap-4 items-center justify-center'>
          <DialogClose asChild>
            <Button variant='destructive' onClick={handleDelete}>
              {loader ? <LoaderCircle className='animate-spin mr-2' /> : null}
              Delete
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

DeleteWithModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  handleDelete: PropTypes.func,
};

export default DeleteWithModal;
