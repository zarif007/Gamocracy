import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "../node_modules/react-quill/dist/quill.snow.css";

import DOMPurify from "isomorphic-dompurify";
import axios from "axios";

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
      { list: "ordered" },
      { list: "bullet" },
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
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const BlogCreation = () => {

  const [blog, setBlog] = useState<{ blogId: string, coverImage: string, title: String; content: string }>({
    blogId: "2qq2ewddd2",
    coverImage: "",
    title: "",
    content: "",
  });

  const [showTitleBorder, setShowTitleBorder] = useState<boolean>(false);

  const [showPreview, setShowPreview] = useState<boolean>(false);


  const handleSubmit = () => {
    // axios.post('https://dacgzl9krh.execute-api.us-east-1.amazonaws.com/staging', blog)
    //   .then(res => console.log(res))
  }

  return (
    <div className="text-white text-2xl">
      {showPreview ? (
        <div className="flex justify-center font-semibold text-gray-300 flex-col m-4">
          <h1 className="text-5xl font-bold my-6">{blog.title}</h1>
          {
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            />
          }
        </div>
      ) : (
        <>
          <div>
            <div className="grid grid-cols-1 space-y-2 pt-4">
              <label className="text-xl font-bold text-gray-300 tracking-wide">
                Cover Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-sm border-2 border-dashed border-white w-full h-20 md:h-40 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col justify-center items-center  ">
                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">Drag and drop</span> files here{" "}
                      <br /> or select a file from your computer
                    </p>
                  </div>
                  <input type="file" accept="image/png" hidden />
                </label>
              </div>
            </div>
          </div>
          <p className="mt-6 text-xl font-bold text-gray-300">Title</p>
          <input
            className={`border ${!showTitleBorder && "border-black"} ${
              blog.title === "" && "border-white"
            } w-full py-3 bg-black text-3xl font-bold mb-4 mt-1 px-1`}
            placeholder="Put a Killing Title"
            defaultValue={`${blog.title}`}
            onChange={(e: any) => {
              const updated = blog;
              updated.title = e.target.value;
              setBlog(updated);
            }}
            onMouseOut={() => setShowTitleBorder(false)}
            onClick={() => setShowTitleBorder(true)}
          />

          <p className="my-2 text-xl font-bold text-gray-300">blog</p>
          <div className="mb-20 mt-2">
            <QuillNoSSRWrapper
              className=""
              defaultValue={`${blog.content}`}
              theme="snow"
              placeholder={blog.content}
              modules={modules}
              formats={formats}
              onChange={(e: any) => {
                const updated = blog;
                updated.content = e;
                setBlog(updated);
              }}
            />
          </div>
        </>
      )}
      <div className="flex space-x-2 justify-end">
        <button
          className="py-1 px-3 rounded-md border-2 border-[#DC143C] text-lg font-semibold text-[#DC143C]"
          onClick={() => setShowPreview(!showPreview)}
        >
          {!showPreview ? "Preview" : "Keep Editing"}
        </button>
        <button 
          className="py-1 px-6 rounded-md bg-[#DC143C] text-lg font-semibold text-white"
          onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default BlogCreation;
