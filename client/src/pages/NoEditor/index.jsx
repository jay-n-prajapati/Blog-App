import PropTypes  from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';



const Auth = () => {
 const navigate = useNavigate();

  const handleChange =(open) =>{
    if (!open) {
        navigate('/')
    }
  }

  return (
    <Dialog defaultOpen={true} onOpenChange={handleChange}>
      <DialogContent className='w-[95%] flex flex-col justify-center gap-8'>
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-sohne-light">
            Start Writing in the Blogify App.
          </DialogTitle>
          <DialogDescription className='text-center text-primary-text text-[14px]'>
            It's Free to Compose and Edit in it.
          </DialogDescription>
        </DialogHeader>
            <Button onClick ={() => navigate('/')}>
                Back to Home
            </Button>
      </DialogContent>
    </Dialog>
  );
};

Auth.propTypes = {
  children: PropTypes.node,
  formType : PropTypes.string,
  defaultOpen : PropTypes.bool
};

export default Auth;
