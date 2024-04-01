import { PropTypes } from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useState } from 'react';
import Signup from './Signup';
import Signin from './Signin';
import { useNavigate } from 'react-router-dom';
import { DialogDescription } from '@radix-ui/react-dialog';


const Auth = ({ children , formType ='' , defaultOpen = false }) => {
  const [content, setContent] = useState(formType);
  const navigate = useNavigate();

  const handlechange =(open) =>{
    if (!open) {
        navigate('/')
    }
  }

  return (
    <Dialog defaultOpen={defaultOpen} onOpenChange={handlechange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-sohne-light">{
            content === 'signup' ? 'Join Blogify.' : 'Welcome Back.'
          }</DialogTitle>
          <DialogDescription className='text-center text-primary-text text-[14px]'>
            {
                content === 'signup' ? 'SignUp here' : 'LogIn here'
            }
          </DialogDescription>
          {content === 'signup' ? <Signup setContent={setContent} /> : <Signin setContent={setContent} />}
        </DialogHeader>
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
