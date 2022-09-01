import React from 'react'
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import "../node_modules/react-quill/dist/quill.snow.css";

// Options of Rich text Editor
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  });
  
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["image"],
      [
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "indent",
    "link",
    "image",
  ];

const TextEditor = ({ value, setValue, defaultValue }: any) => {

  return (
    <QuillNoSSRWrapper
        className=""
        defaultValue={defaultValue}
        theme="snow"
        placeholder={defaultValue}
        modules={modules}
        formats={formats}
        onChange={(e: any) => {
            const updated = value;
            updated.content = e;
            setValue(updated);
        }}
    />
  )
}

export default TextEditor