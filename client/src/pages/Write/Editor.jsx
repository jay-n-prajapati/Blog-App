import React, { useRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Toolbar, { formats, modules } from './Toolbar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PropTypes from 'prop-types';


const Editor = ({ blog, setBlog }) => {
  const reactQuillRef = useRef(null);

  return (
    <div className='pb-4'>
      <div className='flex flex-col gap-4'>
        <div>
        <h1 className='text-primary-text font-sohne-regular text-3xl mb-2'>Blog Title</h1>
          <Input
            placeholder='Write brief description..'
            className='text-lg'
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
        </div>
        <div>
          <h1 className='text-primary-text font-sohne-regular text-3xl mb-2'>Blog Description</h1>
          <Textarea
            placeholder='Write brief description..'
            className='resize-none'
            onChange={(e) => setBlog({ ...blog, briefDescription: e.target.value })}
          />
        </div>
        <div>
          <h1 className='text-primary-text font-sohne-regular text-3xl mb-2'>Blog Content</h1>
          <Toolbar quillRef={reactQuillRef} />
          <ReactQuill
            ref={reactQuillRef}
            theme='snow'
            value={blog.detailedBlog}
            onChange={(content) => setBlog({ ...blog, detailedBlog: content })}
            formats={formats}
            modules={modules}
            className='h-[55vh] max-h-[55vh] overflow-y-auto'
            placeholder='Write your thoughts here..'
          />
        </div>
      </div>
    </div>
  );
};

Editor.propTypes = {
  setBlog: PropTypes.func,
  blog : PropTypes.object
};

export default React.memo(Editor);
