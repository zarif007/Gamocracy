import React, { useState } from "react";
import postInterface from "../../Interfaces/PostInterface";
import TextareaAutosize from 'react-textarea-autosize';
import { BiImageAdd } from "react-icons/bi";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { FaGgCircle } from "react-icons/fa";

const PostCreation = () => {
  const [post, setPost] = useState<postInterface>({
    title: "",
    content: "",
    images: [],
  });

  const [imagesInBase64, setImagesInBase64] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageUpload = (e: any) => {
    setError("");
    if(imagesInBase64.length === 5) {
        setError('You can Attach 5 Images Max')
        return;
    }
    const file = e.target.files[0];

    if (file.size > 1024 * 1024 * 8) {
      setError("Over Sized Cover Image(8MB)");
      return;
    }

    // setCoverImageInUrl();
    setPost( { ...post, images: [ ...post.images, e.target.files[0] ]} )
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagesInBase64([ ...imagesInBase64, (reader.result?.toString() || "") ])
    };

    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {

    const updatedBase64: string[] = [];

    const updatedImages: string[] = [];

    imagesInBase64.map((image: string, i: number) => {
        if(i !== index) {
            updatedBase64.push(image);
        } 
    })

    post.images.map((image: string, i: number) => {
        if(i !== index) {
            updatedImages.push(image);
        } 
    })

    setImagesInBase64(updatedBase64);
    setPost({ ...post, images: updatedImages })
  }

  const handleSubmit = () => {
    console.log(post);
  }

  return (
    <div className="text-gray-300">
      <h1 className="text-4xl my-2 font-bold text-[#DC143C]">Post Creation</h1>
      <p className="mt-6 text-xl font-bold text-gray-300">Title</p>
      <input
        className={`border-2 border-white w-full py-3 bg-black text-3xl font-bold mb-4 mt-1 px-1`}
        placeholder="A Killing Title"
        defaultValue={`${post.title}`}
        onChange={(e: any) => {
          setPost({ ...post, title: e.target.value });
        }}
      />
      <p className="mt-6 text-xl font-bold text-gray-300">Content</p>
      <TextareaAutosize
        className={`border-2 border-white w-full py-3 bg-black text-3xl font-bold mb-4 mt-1 px-1`}
        minRows={1}
        placeholder="An Awesome Content"
        defaultValue={`${post.content}`}
        onChange={(e: any) => {
          setPost({ ...post, content: e.target.value });
        }}
       />
       
       <div className="flex space-x-2">
        <label className="cursor-pointer">
            <BiImageAdd className="h-8 w-8" />
            
            <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e: any) => handleImageUpload(e)}
            />
        </label>
        <BsEmojiSunglassesFill className="h-8 w-6 cursor-pointer" />
       </div>
        
        {/* Displaying Added image */}
       <div className="flex space-x-2 my-2 overflow-x-auto">
        { 
            imagesInBase64.map((image: string, index: number) => {
                return (
                    <img className="h-32 cursor-pointer" key={index} src={image} 
                        onClick={() => removeImage(index)}/>
                )
            })
        }
       </div>

       {/* Displaying Erro */}
       <div className="mb-2 text-xl font-semibold text-red-500">{error}</div>
       
       {/* Submit Button */}
       <div className="flex space-x-2 justify-end">
        <button
            disabled={isLoading}
            className={`py-1 px-6 rounded-md bg-[#DC143C] text-xl font-semibold text-white ${
                isLoading && "opacity-80 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            >
            {isLoading ? (
                <div className="flex justify-center items-center space-x-2">
                <FaGgCircle className="animate-spin h-5 w-5" />
                <p>Posting </p>
                </div>
            ) : (
                <p>Post</p>
            )}
            </button>
       </div>
       

    </div>
  );
};

export default PostCreation;
