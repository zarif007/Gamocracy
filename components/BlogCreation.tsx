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
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['image'],
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

  const [value, setValue] = useState('');

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <div className='text-white text-lg'>
      Blog
      <div className='mb-32 mt-2'>
        <QuillNoSSRWrapper theme='snow' placeholder={value} modules={modules} formats={formats} onChange={setValue} />
      </div>
    </div>
  )
}

export default BlogCreation
