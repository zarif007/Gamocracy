import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import "../node_modules/react-quill/dist/quill.snow.css";
import DOMPurify from "isomorphic-dompurify";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import 'react-quill/dist/quill.snow.css';
import Image from "next/image";
import { FaGgCircle } from "react-icons/fa";
import { useRouter } from 'next/router'
import BlogContent from "./BlogContent";
import AWS from 'aws-sdk'


// s3 Buckect config
const s3 = new AWS.S3({
  region: 'us-east-1',
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_ID || '',
  signatureVersion: 'v4',
})

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

const BlogCreation = () => {

  const [blog, setBlog] = useState<{ blogId: string, coverImage: string, title: String; content: string }>({
    blogId: uuidv4(),
    coverImage: "",
    title: "",
    content: "",
  });

  const router = useRouter();

  const [showTitleBorder, setShowTitleBorder] = useState<boolean>(false);

  const [showPreview, setShowPreview] = useState<boolean>(false);

  const [coverImageInBase64, setCoverImageInBase64] = useState<string>('');

  const [coverImageInUrl, setCoverImageInUrl] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>('');


  // Store both base64 and file format of the coverImage
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    setCoverImageInUrl(e.target.files[0]);
    const reader = new FileReader();

    reader.onloadend = () => {
      setCoverImageInBase64(reader.result?.toString() || ''); 
      setBlog({...blog, coverImage: reader.result?.toString() || ''})     
    }

    reader.readAsDataURL(file);
  }


  // Upload coverImage on s3 and upload the entire blog part on dynamoDB 
  const handleSubmit = async () => {
    if(isLoading) return;

    setIsLoading(true);

    setError('');

    const imageName = `blog/${blog.title}_${Date.now()}.jpg`;

    const params = {
      Bucket: 'gc-s3images',
      Key: imageName,
      Body: coverImageInUrl,
    }

    try {
      const uploadedDataOns3 = await s3.upload(params).promise()
      const imgParams = {
        Bucket: 'gc-s3images',
        Key: imageName,
        Expires: 60,
        
      }

      const signedUrl = await s3.getSignedUrlPromise('getObject', imgParams);
      console.log(signedUrl)

      const up = blog;
      up.coverImage = signedUrl;
      setBlog(up);
    } catch (err) {
      console.log('error', err)
    }

    try{
      await axios.post('https://dacgzl9krh.execute-api.us-east-1.amazonaws.com/staging', blog)
      .then(res => {
        if(res.status === 201){
          router.push(`/write/blog/${res.data.blogId}`);
        } else {
          setError('Over sized data')
          setIsLoading(false);
        }
      })
    } catch {
      setError('Over sized data')
      setIsLoading(false);
    }
    
    setIsLoading(false);
  }

  return (
    <div className="text-white text-2xl">
      {showPreview ? (
        // Preview before uploading part
        <BlogContent blog={blog} />
      ) : (
        // Blog uploading part
        <>
          <div>
            <div className="grid grid-cols-1 space-y-2 pt-4">
              <label className="text-xl font-bold text-gray-300 tracking-wide">
                Cover Image
              </label>
              <div className="flex items-center justify-center w-full">
                {
                  coverImageInBase64 === '' ? <label className="flex flex-col rounded-sm border-2 border-dashed border-white w-full h-20 md:h-40 p-10 group text-center">
                    <div className="h-full w-full text-center flex flex-col justify-center items-center  ">
                      <p className="pointer-none text-gray-500 text-sm md:text-lg">
                        <span className="">select a file from your computer</span>
                        <br />Try to follow 3:1 ratio
                      </p>
                    </div>
                    <input type="file" accept="image/png" hidden onChange={(e: any) => handleImageUpload(e)} />
                  </label> : <Image src={coverImageInBase64} alt="Current Image" width={900} height={300} onClick={() => setCoverImageInBase64('')} />
                }
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

          <p className="my-2 text-xl font-bold text-gray-300">Content</p>
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

      {/* Error */}
      <div className="mb-2 text-xl font-semibold text-red-500">{error}</div>

      {/* Button of preview and post */}
      <div className="flex space-x-2 justify-end mt-2">
        <button
          className="py-1 px-3 rounded-md border-2 border-[#DC143C] text-lg font-semibold text-[#DC143C]"
          onClick={() => setShowPreview(!showPreview)}
        >
          {!showPreview ? "Preview" : "Keep Editing"}
        </button>
        <button 
          disabled={isLoading}
          className={`py-1 px-6 rounded-md bg-[#DC143C] text-lg font-semibold text-white ${isLoading && 'opacity-80 cursor-not-allowed'}`}
          onClick={handleSubmit}>
            {
              isLoading ? <div className="flex justify-center items-center space-x-2">
                <FaGgCircle className="animate-spin h-5 w-5" />
                <p>Posting </p>
              </div> : <p>
                Post
              </p>
            }
        </button>
      </div>
    </div>
  );
};

export default BlogCreation;
