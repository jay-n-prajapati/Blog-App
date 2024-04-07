import PropTypes from 'prop-types';
import CommonAvatar from './Avatar';
import { useNavigate } from 'react-router-dom';
import SaveButton from './SaveButton';

const BlogCard = ({ blog, children }) => {
  const { id, title, briefDescription, author, subCategory, published } = blog;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className='border border-b p-2 px-5 max-w-[45rem]'>
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-2'>
          <CommonAvatar userName={author} className='h-7 w-7' />
          <p className='text-[10px] sm:text-xs'>{author}</p>
        </div>
        <p className='text-[10px] sm:text-xs'>*{published}</p>
      </div>
      <div className='flex flex-col items-center justify-between'>
        <div className='flex gap-4 cursor-pointer my-2' onClick={handleClick}>
          <div className='flex flex-col justify-center gap-2 w-2/3'>
            <h2 className=' text-sm sm:text-xl text-pretty line-clamp-2 font-sohne-semibold'>
              {title}
            </h2>
            <div className='hidden xsm:block'>
              <p className='text-xs sm:text-sm text-secondary-text line-clamp-3'>
                {briefDescription}
              </p>
            </div>
          </div>
          <div className='w-1/3 p-1'>
            <img src='/images/placeholder-img.jpg' alt='' className='w-full' />
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div className='flex gap-4'>
            <span className='text-[10px] sm:text-xs bg-[#f2f2f2] text-[#6b6b6b] px-3 py-1 rounded-xl'>
              {subCategory}
            </span>
          </div>
          <div className='flex gap-5'>
            {children}
            <SaveButton blog={blog} />
          </div>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object,
  children: PropTypes.node,
};

export default BlogCard;
