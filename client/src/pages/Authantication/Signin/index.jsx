import { PropTypes } from 'prop-types';
import Form from '@/components/common/Form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputWithLabel from '@/components/common/InputWithLabel';

const Signin = ({ setContent }) => {
  return (
    <>
      <div>
        <Form className="p-0">
          <InputWithLabel
            label="Email"
            labelFor="email"
            type="email"
            placeholder="john@example.com"
          />
          <InputWithLabel
            label="Password"
            labelFor="password"
            type="password"
            placeholder="John@123"
          />
          <div className="flex gap-2">
            <Button>SIGN IN</Button>
          </div>
        </Form>
      </div>
      <div className="flex items-center justify-center gap-1 text-primary-text text-sm">
        <p>New to Blogify ? </p>
        <Button
          variant="link"
          className="text-primary h-0 p-0"
          onClick={() => setContent('signup')}>
          Sign Up
        </Button>
      </div>
    </>
  );
};

Signin.propTypes = {
  setContent: PropTypes.func
};

export default Signin;
