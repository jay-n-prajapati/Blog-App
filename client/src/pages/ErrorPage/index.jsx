import HelmetHeader from '@/components/common/HelmetHeader';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
      <HelmetHeader title='Error' />
      <div className='w-[100vw] h-[100vh] flex items-center justify-center flex-col gap-2'>
        <div className='w-1/2 h-1/2'>
          <img
            src='/images/error-page.png'
            alt='404 not found'
            className='size-full aspect-square object-contain'
          />
        </div>
        <div>
          <NavLink to='/'>
            <Button>Back To Home</Button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
