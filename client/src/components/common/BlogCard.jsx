import PropTypes from 'prop-types';
import CommonAvatar from './Avatar';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import {useNavigate} from 'react-router-dom'

const BlogCard = ({ blog }) => {
  const {
    id,
    title,
    briefDescription,
    author,
    subCategory,
    published,
    likes,
  } = blog;
  
  const navigate = useNavigate()


  const handleClick = () =>{
    navigate(`/blog/${id}`)
  }

  return (
    <div className='border border-b p-2 px-5 max-w-[45rem]'>
      <div className='flex items-center gap-6 mb-2'>
        <div className='flex items-center gap-2'>
        <CommonAvatar userName={author} className='h-7 w-7' />
        <p className='text-[10px] sm:text-xs'>{author}</p>
        </div>
        <p className='text-[10px] sm:text-xs'>*{published}</p>
      </div>
        <div className='flex flex-col items-center justify-between'>

      <div className='flex gap-4 cursor-pointer' onClick={handleClick}>
        <div className='flex flex-col justify-center gap-2 w-2/3'>
          <h2 className=' text-lg sm:text-xl text-pretty line-clamp-2 font-sohne-semibold'>{title}</h2>
          <p className='text-xs sm:text-sm text-secondary-text max-h-14 line-clamp-3'>
            {briefDescription}
          </p>
        </div>
        <div className='w-1/3 p-1'>
          <img src='/images/placeholder-img.jpg' alt='' className='size-full' />
        </div>
        </div>
        <div className='w-full flex items-center justify-between mt-4'>
          <div className='flex gap-4'>
            <span className='text-[10px] sm:text-xs'> {subCategory}</span>
          </div>
          <div className='flex gap-2'>
          <div className='flex items-center gap-1'>
            <Button variant='link' className='px-0' size='sm'>
              <Heart className='text-black p-[1px]' />
            </Button>
              <span className='text-lg'>{likes}</span>
            </div>
            <Button variant='link' className='px-0' size='sm'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' className='nk'>
                <path
                  d='M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z'
                  fill='#000'
                ></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object,
};

export default BlogCard;
