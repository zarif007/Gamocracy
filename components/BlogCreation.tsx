import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import '../node_modules/react-quill/dist/quill.snow.css'


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

  const [content, setContent] = useState<{ title: String, body: string }>({title: 'title', body: ''});

  const [showTitleInput, setShowTitleInpt] = useState<boolean>(false);

  return (
    <div className='text-white text-lg'>
      {
        !showTitleInput ? <div className='w-full border border-black py-3 bg-black text-2xl font-bold my-4 px-1 cursor-pointer'
          onClick={() => setShowTitleInpt(true)}>
          {content.title}
        </div> :
        <input 
          className='border w-full py-3 bg-black text-xl font-bold my-4 px-1'
          placeholder={`${content.title}`}
          defaultValue={`${content.title}`}
          onChange={(e: any) => {
            const updated = content;
            updated.title = e.target.value;
            setContent(updated);
          }}
          onMouseOut={() => setShowTitleInpt(false)}
        />
      }

      <p className='my-2 text-lg font-bold text-gray-300'>Content</p>
      <div className='mb-32 mt-2'>
        <QuillNoSSRWrapper className='' theme='snow' placeholder={content.body} modules={modules} formats={formats} onChange={(e: any) => {
          const updated = content;
          updated.body = e;
          setContent(updated);
        }} />
      </div>
    </div>
  )
}

export default BlogCreation
