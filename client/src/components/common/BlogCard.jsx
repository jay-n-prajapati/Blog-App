import PropTypes from 'prop-types';
import CommonAvatar from './Avatar';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';

const BlogCard = ({ blog }) => {
  const { id, title, briefDescription: briefDescription, author, parentCategory, subCategory, published, likes } = blog;
  return (
    <div className='border border-b p-4 max-w-[40rem]'>
      <div className='flex items-center gap-4'>
        <CommonAvatar userName={author} className='h-8 w-8' />
        <p className='text-xs'>Author : {author}</p>
        <p className='text-xs'>Published : {published}</p>
      </div>
      <div className='flex items-center justify-between'>
        <div className='w-2/3'>
          <h2 className='text-xl font-sohne-semibold'>{title}</h2>
          <p className='text-sm text-primary-text text-pretty text-ellipsis'>{briefDescription}</p>
          <div className='flex items-center justify-between'>
            <div className='flex gap-4'>
             <span className='text-xs'> {parentCategory}</span>
              <span className='text-xs'> {subCategory}</span>
            </div>
            <div>
              <Button variant='link'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' className='nk'>
                  <path
                    d='M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z'
                    fill='#000'
                  ></path>
                </svg>
              </Button>
              <Button variant='link'>
                <Heart className='text-black p-[1px]'/>
              </Button>
            </div>
          </div>
        </div>
        <div className='size-16 bg-black size-40'>
            <img src="/images/placeholder-img.jpg" alt="" className='size-full' />
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object,
};

export default BlogCard;
