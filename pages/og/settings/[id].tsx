import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { apiEndpoints } from "../../../domain";
import userInterface from "../../../Interfaces/UserInterface";
import { FaGgCircle } from "react-icons/fa";
import s3ImageUploder from "./../../../s3ImageUploder";
import { showNotification } from "./../../_app";
import NavBar from "../../../components/navBars/NavBar";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get(`${apiEndpoints.user}/?email=${params?.id}`);

  return {
    props: {
      user: data,
    },
  };
};

const UserSettings: React.FC<{ user: userInterface }> = ({ user }) => {
  const {
    query: { id },
  } = useRouter();

  const router = useRouter();

  const [updatedUser, setUpdatedUser] = useState<userInterface>({
    name: "",
    image: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [userImageInFile, setUserImageInFile] = useState<any>(null);

  const [userImageInBase64, setUserImageInBase64] = useState<string>("");

  const [errors, setErrors] = useState<string>("");

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  useEffect(() => {
    setErrors("");
    if (updatedUser.name === "") {
      setErrors("Name can not be blank");
      return;
    }
  }, [updatedUser]);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    setUserImageInFile(e.target.files[0]);
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserImageInBase64(reader.result?.toString() || "");
    };

    reader.readAsDataURL(file);
  };

  const handleImageUploadToS3 = async () => {
    if (!userImageInFile) return;

    const type = userImageInFile.type.split("/")[1];
    const imageName = `userDP/${updatedUser.email}.${type}`;

    const up = updatedUser;
    up.image = await s3ImageUploder(imageName, userImageInFile);
    setUpdatedUser(up);
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);

    await handleImageUploadToS3();
    try {
      await axios
        .put(`${apiEndpoints.user}/?email=${user.email}`, updatedUser)
        .then((res) => {
          showNotification("Updated 😎");
          router.push(`/og/${updatedUser.email}`);
        });
    } catch {
      setErrors("Failed to upload, try again later");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <NavBar />
      <div className="max-w-5xl mx-auto mt-16">
        <div className="mx-4">
          <h1 className="text-4xl my-2 font-bold text-[#DC143C]">
            User Settings
          </h1>
          <p className="mt-6 text-xl font-bold text-gray-300">User Name</p>
          <input
            className={`border-2 border-white w-full py-2 bg-black text-xl font-bold mb-4 mt-1 px-1 text-gray-300`}
            placeholder="User Name"
            defaultValue={updatedUser.name}
            onChange={(e: any) => {
              setUpdatedUser({ ...updatedUser, name: e.target.value });
            }}
          />
          <p className="mt-6 text-xl font-bold text-gray-300 mb-2">
            User Image
          </p>
          <div className="flex space-x-4">
            {/* {
              updatedUser.image && <Image
                className="rounded-md"
                src={userImageInBase64 || updatedUser.image}
                height={130}
                width={130}
                blurDataURL={userImageInBase64 || updatedUser.image}
                placeholder='blur'
                objectFit="cover"
              />
            } */}
            <img
              src={userImageInBase64 || updatedUser.image}
              alt="author dp"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
              className="rounded-md"
              loading="lazy"
            />

            {/* Image uploading */}
            <label className="flex flex-col rounded-md border-2 border-dashed border-white w-40 p-10 group text-center">
              <div className="h-full w-full text-center flex flex-col justify-center items-center  ">
                <p className="pointer-none text-gray-500 text-sm md:text-lg">
                  Select a new DP
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e: any) => handleImageUpload(e)}
              />
            </label>
          </div>
          <div className="mb-6 text-xl font-semibold text-red-500 mt-4">
            {errors}
          </div>
          <div className="flex space-x-2 justify-end pt-4">
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
                  <p>Saving</p>
                </div>
              ) : (
                <p>Save</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
