import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import Signup from './Signup';
import Signin from './Signin';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Auth = ({ children, formType = '', defaultOpen = false }) => {
  const [content, setContent] = useState(formType);
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (open) => {
    if (!open) {
      navigate('/');
    }
  };

  useEffect(() => {
    isAuth ? navigate(-1) : null;
  }, []);

  return (
    <Dialog defaultOpen={defaultOpen} onOpenChange={handleChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-3xl font-sohne-light'>
            {content === 'signup' ? 'Join Blogify.' : 'Welcome Back.'}
          </DialogTitle>
          <DialogDescription className='text-center text-primary-text text-[14px]'>
            {content === 'signup' ? 'SignUp here' : 'LogIn here'}
          </DialogDescription>
          {content === 'signup' ? (
            <Signup setContent={setContent} />
          ) : (
            <Signin setContent={setContent} />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

Auth.propTypes = {
  children: PropTypes.node,
  formType: PropTypes.string,
  defaultOpen: PropTypes.bool,
};

export default Auth;
