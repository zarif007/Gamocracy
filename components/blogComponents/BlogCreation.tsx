import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { FaGgCircle } from "react-icons/fa";
import { useRouter } from "next/router";
const BlogContent = dynamic(() => import("./BlogContent"));
import { apiEndpoints } from "../../domain";
import { useSession } from "next-auth/react";
const Selector = dynamic(() => import("../Selector"));
import { showNotification } from "../../pages/_app";
import gameForOptionInterface from "../../Interfaces/GameForOptionInterface";
import blogInterface from "../../Interfaces/BlogInterface";
const CustomTextEditor = dynamic(() => import('./../reusable/CustomTextEditor'));
import s3ImageUploder from './../../s3ImageUploder';


// Category
const category: string[] = [
  "Review ⭐",
  "Patch Note/Update 🆙",
  "Leaks 💧",
  "Tutorial ✍️",
  "News 📰",
  "Upcoming ⏭️",
];

// Blog error interface 
interface errorInterface {
  coverImage: string;
  title: string;
  content: string;
  selectedGames: string;
  selectedCategories: string;
  others: string;
}


const BlogCreation = () => {
  const { data: session } = useSession();

  const [blog, setBlog] = useState<blogInterface>({
    type: "blog",
    blogId: uuidv4(),
    coverImage: "",
    title: "",
    content: "",
    selectedGames: [],
    selectedCategories: [],
    author: "",
    createdAt: "",
    updatedAt: "",
    views: 0,
  });

  const router = useRouter();

  const [showPreview, setShowPreview] = useState<boolean>(false);

  const [coverImageInBase64, setCoverImageInBase64] = useState<string>("");

  const [coverImageInUrl, setCoverImageInUrl] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<errorInterface>({
    coverImage: '',
    title: '',
    content: '',
    selectedGames: '',
    selectedCategories: '',
    others: '',
  });

  const [optionsForGames, setOptionsForGames] = useState<
    gameForOptionInterface[]
  >([]);


  const [optionsForCategories, setOptionsForCategories] =
    useState<string[]>(category);

  const resetErrors = () => {
    setErrors({
      coverImage: '',
      title: '',
      content: '',
      selectedGames: '',
      selectedCategories: '',
      others: '',
    });
  }

  // Adding Games to blog obj
  const addGame = (selectedGame: gameForOptionInterface) => {
    resetErrors();

    if (selectedGame.name === "") return;

    if (blog.selectedGames.length >= 3) {
      setErrors({ ...errors, selectedGames: 'Set upto 3 Games' });
      return;
    }

    if (
      blog.selectedGames.length === 0 ||
      !blog.selectedGames.includes(selectedGame)
    ) {
      setBlog({
        ...blog,
        selectedGames: [...blog.selectedGames, selectedGame],
      });
    }
  };

  // Fetch games from db
  const fetchGames = (query: string) => {
    setOptionsForGames([]);
    axios
      .get(
        `https://api.rawg.io/api/games?search=${query}&key=${process.env.NEXT_PUBLIC_RAWG_APIKEY}`
      )
      .then((res) => {
        res.data.results.map((rs: any) => {
          const newObj = { name: rs.name, image: rs.background_image };
          const updated = optionsForGames;
          updated.push(newObj);
          setOptionsForGames(updated);
        });
      });
  };

  const addCategory = (selectedCategory: string) => {
    resetErrors();

    if (selectedCategory === "") return;

    if (blog.selectedCategories.length === 2) {
      setErrors({ ...errors, selectedCategories: 'Select upto 2 Categories' });
      return;
    }

    if (
      blog.selectedCategories.length === 0 ||
      !blog.selectedCategories.includes(selectedCategory)
    ) {
      setBlog({
        ...blog,
        selectedCategories: [...blog.selectedCategories, selectedCategory],
      });
    }
  };

  const queryCategory = (query: string) => {
    setOptionsForCategories([]);

    const formatedQuery = query.trim().replace(" ", "").toLocaleLowerCase();

    setOptionsForCategories([
      ...category.filter((op) =>
        op.toLocaleLowerCase().includes(formatedQuery)
      ),
    ]);
  };

  // Updating blog title that will be used as imageName and id
  useEffect(() => {
    resetErrors();

    if (blog.title === "") return;

    let updatedTitle2 = "";

    for (let i = 0; i < blog.title.length; i++) {
      if (/\d/.test(blog.title[i]) || /[a-zA-Z]/.test(blog.title[i])) {
        updatedTitle2 = updatedTitle2 + blog.title[i];
      }
    }

    if (updatedTitle2 === "") {
      setErrors({ ...errors, title: "Title must contain a-z or A-Z or 0-9" });
      return;
    }

    setBlog({
      ...blog,
      blogId: `${updatedTitle2
        .replaceAll(" ", "-")
        .toLowerCase()}-${Date.now()}`,
    });
  }, [blog.title]);

  // Getting author email from session
  useEffect(() => {
    const updated = blog;
    updated.author = session?.user?.email || "";
    setBlog(updated);
  }, [session]);

  // Store both base64 and file format of the coverImage
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    resetErrors();

    if (file.size > 1024 * 1024 * 8) {
      setErrors({ ...errors, coverImage: "Over Sized Cover Image(8MB)" });
      return;
    }

    setCoverImageInUrl(e.target.files[0]);
    const reader = new FileReader();

    reader.onloadend = () => {
      setCoverImageInBase64(reader.result?.toString() || "");
      setBlog({ ...blog, coverImage: reader.result?.toString() || "" });
    };

    reader.readAsDataURL(file);
  };

  // Upload Image on S3
  const uploadImageOnS3 = async () => {
    const imageName = `blog/${blog.blogId}.jpeg`;

    const up = blog;
    up.coverImage = await s3ImageUploder(imageName, coverImageInUrl);
    setBlog(up);
  };

  const handleInputsErrors = () => {
    if(blog.title === "") {
      setErrors({ ...errors, title: 'Add title' })
      return 1;
    }
    if(blog.coverImage === "") {
      setErrors({ ...errors, coverImage: 'Add cover image' })
      return 1;
    }
    if(blog.content === "") {
      setErrors({ ...errors, content: 'Add content' })
      return 1;
    }
    if(blog.selectedCategories.length === 0) {
      setErrors({ ...errors, selectedCategories: 'Select related Category' })
      return 1;
    }
    if(blog.selectedGames.length === 0) {
      setErrors({ ...errors, selectedGames: 'Select related Game' })
      return 1;
    }

    return 0;
  }

  // Upload coverImage on s3 and upload the entire blog part on dynamoDB
  const handleSubmit = async () => {
    if (isLoading) return;

    resetErrors();

    if(handleInputsErrors()){
      return;
    }

    setIsLoading(true);

    let uploadingTime: string = new Date(Date.now()).toISOString();

    const updated = blog;
    updated.createdAt = uploadingTime;
    updated.updatedAt = uploadingTime;
    setBlog(updated);

    await uploadImageOnS3();

    try {
      await axios.post(apiEndpoints.blog, blog).then((res) => {
        if (res.status === 201) {
          showNotification("Blog Uploaded 😎");
          router.push(`/blog/${res.data.blogId}`);
        } else {
          setErrors({ ...errors, others: 'Failed to upload, try again later' });
        }
      });
    } catch {
      setErrors({ ...errors, others: 'Failed to upload, try again later' });
    }

    setIsLoading(false);
  };

  return (
    <div className="text-white text-2xl">
      <h1 className="text-4xl my-2 font-bold text-[#DC143C]">Blog Creation</h1>
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
                {coverImageInBase64 === "" ? (
                  <label className="flex flex-col rounded-sm border-2 border-dashed border-white w-full h-20 md:h-40 p-10 group text-center">
                    <div className="h-full w-full text-center flex flex-col justify-center items-center  ">
                      <p className="pointer-none text-gray-500 text-sm md:text-lg">
                        <span className="">
                          select a file from your computer
                        </span>
                        <br />
                        Try to follow 3:1 ratio
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e: any) => handleImageUpload(e)}
                    />
                  </label>
                ) : (
                  <Image
                    src={coverImageInBase64}
                    alt="Current Image"
                    width={900}
                    height={300}
                    objectFit='cover'
                    onClick={() => setCoverImageInBase64("")}
                  />
                )}
              </div>
              <div className="mb-6 text-xl font-semibold text-red-500">{errors.coverImage}</div>
            </div>
          </div>
          <p className="mt-6 text-xl font-bold text-gray-300">Title</p>
          <input
            className={`border-2 border-white w-full py-3 bg-black text-3xl font-bold mb-4 mt-1 px-1`}
            placeholder="A Killing Title"
            defaultValue={`${blog.title}`}
            onChange={(e: any) => {
              setBlog({ ...blog, title: e.target.value });
            }}
          />
          <div className="mb-6 text-xl font-semibold text-red-500">{errors.title}</div>

          {/* Text Editor for content */}
          <p className="my-2 text-xl font-bold text-gray-300">Content</p>
          <div className="mb-4 mt-2">
            <CustomTextEditor value={blog}
              setValue={setBlog}
              defaultValue={blog.content} />
          </div>
          <div className="mb-6 text-xl font-semibold text-red-500">{errors.content}</div>

          {/* Related Game uploading part */}
          <p className="my-2 text-xl font-bold text-gray-300">
            Select related Games (Max. 3)
          </p>
          <div className="flex items-center space-x-4 my-2">
            {blog.selectedGames.length > 0 &&
              blog.selectedGames.map((game: gameForOptionInterface) => {
                return (
                  <div
                    className="flex items-center space-x-2 bg-black border py-1 px-2 rounded-md cursor-pointer"
                    key={game.name}
                    onClick={() => {
                      setBlog({
                        ...blog,
                        selectedGames: [
                          ...blog.selectedGames.filter(
                            (up) => up.name != game.name
                          ),
                        ],
                      });
                    }}
                  >
                    <img src={game.image} alt="bg" className="rounded-md h-6" />
                    <p className="text-sm text-gray-300">{game.name}</p>
                  </div>
                );
              })}
          </div>
          <Selector
            fetchFunction={fetchGames}
            propsOption={optionsForGames}
            addFunction={addGame}
          />
          <div className="mb-6 text-xl font-semibold text-red-500">{errors.selectedGames}</div>

          {/* Related Category uploading part */}
          <p className="my-2 text-xl font-bold text-gray-300">
            Select related Category (Max. 2)
          </p>
          <div className="flex items-center space-x-4 my-2">
            {blog.selectedCategories.length > 0 &&
              blog.selectedCategories.map((category: string) => {
                return (
                  <div
                    className="flex items-center space-x-2 bg-black border py-1 px-2 rounded-md cursor-pointer"
                    key={category}
                    onClick={() => {
                      setBlog({
                        ...blog,
                        selectedCategories: [
                          ...blog.selectedCategories.filter(
                            (up) => up != category
                          ),
                        ],
                      });
                    }}
                  >
                    <p className="text-sm text-gray-300">{category}</p>
                  </div>
                );
              })}
          </div>
          <Selector
            fetchFunction={queryCategory}
            propsOption={optionsForCategories}
            addFunction={addCategory}
          />
          <div className="mb-6 text-xl font-semibold text-red-500">{errors.selectedCategories}</div>
        </>
      )}

      {/* Error */}
      <div className="mb-6 text-xl font-semibold text-red-500">{errors.others}</div>

      {/* Button of preview and post */}
      <div className="flex space-x-2 justify-end mt-2 mb-6">
        <button
          className="py-1 px-3 rounded-md border-2 border-[#DC143C] text-lg font-semibold text-[#DC143C]"
          onClick={() => setShowPreview(!showPreview)}
        >
          {!showPreview ? "Preview" : "Keep Editing"}
        </button>
        <button
          disabled={isLoading}
          className={`py-1 px-6 rounded-md bg-[#DC143C] text-lg font-semibold text-white ${
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

export default BlogCreation;
