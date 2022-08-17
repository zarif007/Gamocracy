import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import '../node_modules/react-quill/dist/quill.snow.css'


import DOMPurify from 'isomorphic-dompurify';


const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
  ssr: false,
  loading: () => <p>Loading ...</p>,
});


const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['image'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
]

const BlogCreation = () => {

  const [content, setContent] = useState<{ title: String, body: string }>({title: '', body: ''});

  const [showTitleBorder, setShowTitleBorder] = useState<boolean>(false);

  return (
    <div className='text-white text-lg'>
      <input 
          className={`border ${!showTitleBorder && 'border-black'} ${content.title === '' && 'border-white'} w-full py-3 bg-black text-2xl font-bold my-4 px-1`}
          placeholder='Title'
          onChange={(e: any) => {
            const updated = content;
            updated.title = e.target.value;
            setContent(updated);
          }}
          onMouseOut={() => setShowTitleBorder(false)}
          onClick={() => setShowTitleBorder(true)}
        />

      <p className='my-2 text-lg font-bold text-gray-300'>Content</p>
      <div className='mb-20 mt-2'>
        <QuillNoSSRWrapper className='' theme='snow' placeholder={content.body} modules={modules} formats={formats} onChange={(e: any) => {
          const updated = content;
          updated.body = e;
          setContent(updated);
        }} />
      </div>

      {/* { <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.body) }} /> } */}

      <div className='flex space-x-2 justify-end'>
        <button className='py-1 px-3 rounded-md border-2 border-[#DC143C] text-lg font-semibold text-[#DC143C]'>Preview</button>
        <button className='py-1 px-6 rounded-md bg-[#DC143C] text-lg font-semibold text-white'>Post</button>
      </div>
    </div>
  )
}

export default BlogCreation
