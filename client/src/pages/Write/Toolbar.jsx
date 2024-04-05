import { Quill } from 'react-quill';

const Size = Quill.import('formats/size');
Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
Quill.register(Size, true);
 
const BlockEmbed = Quill.import('blots/block/embed');
class CustomImageBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute('src', value.src);
    node.setAttribute('alt', value.alt);
    node.style.width = '70%';
    node.style.display = 'block';
    node.style.margin = '0 auto';
    return node;
  }
  static value(node) {
    return { src: node.getAttribute('src'), alt: node.getAttribute('alt') };
  }
}
CustomImageBlot.blotName = 'image';
CustomImageBlot.tagName = 'img';
Quill.register(CustomImageBlot);

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/upload`,
    { method: 'POST', body: formData },
  );
  const data = await res.json();
  const url = data.url;
  return url;
};

let reactQuillRef;

const imageHandler = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  input.onchange = async () => {
    if (input !== null && input.files !== null) {
      const file = input.files[0];
      const url = await uploadToCloudinary(file);
      const quill = reactQuillRef.current;
      if (quill) {
        const range = quill.getEditorSelection();
        range && quill.getEditor().insertEmbed(range.index, 'image', { src: url, alt: 'Image' });
      }
    }
  };
};

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      image: imageHandler,
    },
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'code-block',
];

// Quill Toolbar component
export const Toolbar = ({ quillRef }) => {

  reactQuillRef = quillRef;

  return (
    <div id='toolbar' className='flex items-center justify-center flex-wrap h-auto'>
      <span className='ql-formats'>
        <select className='ql-size' defaultValue='medium'>
          {/* <option value="extra-small">size 1</option> */}
          <option value='small'>size 1</option>
          <option value='medium'>size 2</option>
          <option value='large'>size 3</option>
        </select>
        <select className='ql-header' defaultValue='3'>
          <option value='1'>Heading</option>
          <option value='2'>Subheading</option>
          <option value='3'>Normal</option>
        </select>
      </span>
      <span className='ql-formats'>
        <button className='ql-bold' />
        <button className='ql-italic' />
        <button className='ql-underline' />
        <button className='ql-strike' />
      </span>
      <span className='ql-formats'>
        <button className='ql-list' value='ordered' />
        <button className='ql-list' value='bullet' />
        <button className='ql-indent' value='-1' />
        <button className='ql-indent' value='+1' />
      </span>
      <span className='ql-formats'>
        <button className='ql-script' value='super' />
        <button className='ql-script' value='sub' />
        <button className='ql-blockquote' />
      </span>
      <span className='ql-formats'>
        <select className='ql-align' />
        <select className='ql-color' />
        <select className='ql-background' />
      </span>
      <span className='ql-formats'>
        <button className='ql-link' />
        <button className='ql-image' />
      </span>
      <span className='ql-formats'>
        <button className='ql-code-block' />
        <button className='ql-clean' />
      </span>
    </div>
  );
};

export default Toolbar;
