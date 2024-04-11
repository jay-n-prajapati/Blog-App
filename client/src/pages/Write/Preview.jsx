import CommonAvatar from '@/components/common/Avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import PropTypes from 'prop-types';
import parse from 'html-react-parser'
import './blog.css'
import useRole from '@/utils/custom-hooks/useRole';

const Preview = ({ children , blog }) => {
    const {currentUser} = useRole()
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-[90%] h-[90vh] overflow-auto'>
        <DialogHeader>
          <DialogTitle className='text-center text-xl sm:text-2xl md:text-3xl font-sohne-light underline'>Blog Preview</DialogTitle>
        </DialogHeader>
        <div className='mx-auto max-w-[680px] pt-8'>
          <div>
            <h1 className=' text-2xl sm:text-3xl md:text-4xl font-sohne-semibold mb-4'>
              {blog?.title}
            </h1>
          </div>
          <div>
            <h3 className='text-primary-text text-pretty text-sm sm:text-base md:text-lg mb-4'>
              {blog?.briefDescription}
            </h3>
          </div>
          <div className='my-4'>
            <div className='flex items-center justify-between py-2 border-t border-b'>
              <div className='flex items-center gap-2'>
                <div>
                  {blog && <CommonAvatar className='size-7 sm:size-8' userName={currentUser.name} />}
                </div>
                <div>
                  <div>
                    <h3 className='text-primary-text text-[10px] sm:text-xs'>{currentUser.name}</h3>
                  </div>
                  <div className='flex justify-end gap-2 sm:gap-6'>
                    {blog && (
                      <h3 className='text-primary-text text-[10px] sm:text-xs'>
                        {blog?.published}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='blog-container'>{blog && parse(blog?.detailedBlog)}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

Preview.propTypes = {
    children: PropTypes.node,
    blog: PropTypes.object,
  };

export default Preview;
