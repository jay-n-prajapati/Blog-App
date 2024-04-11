import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Toolbar, { formats, modules } from './Toolbar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PropTypes from 'prop-types';
import './editor.css'

const Editor = ({ blog, setBlog }) => {
  const reactQuillRef = useRef(null);

  return (
    <div className='pb-4'>
      <div className='flex flex-col gap-4'>
        <div>
          <h1 className='text-primary-text font-sohne-regular text-2xl mb-2'>Blog Title</h1>
          <Input
            placeholder='write title..'
            className='text-lg'
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
        </div>
        <div>
          <h1 className='text-primary-text font-sohne-regular text-2xl mb-2'>Blog Description</h1>
          <Textarea
            placeholder='write brief description..'
            className='resize-none rounded'
            onChange={(e) => setBlog({ ...blog, briefDescription: e.target.value })}
          />
        </div>
        <div>
          <h1 className='text-primary-text font-sohne-regular text-2xl mb-2'>Blog Content</h1>
          <Toolbar quillRef={reactQuillRef} />
          <div className='quill-container'>
            <ReactQuill
              ref={reactQuillRef}
              theme='snow'
              value={blog.detailedBlog}
              onChange={(content , text) => { setBlog({ ...blog, detailedBlog: content }) ; console.log(text) }}
              formats={formats}
              modules={modules}
              className='h-[60vh] max-h-[60vh] overflow-y-auto'
              placeholder='write your thoughts here..'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Editor.propTypes = {
  setBlog: PropTypes.func,
  blog: PropTypes.object,
};

export default React.memo(Editor);
