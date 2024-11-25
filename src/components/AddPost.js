import { useLogin } from "@/util/LoginContext";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import PlusIcon from "./icons/Plus";
import Uploading from "./icons/Uploading";

const AddPost = () => {
  const [image, setImage] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const { user } = useLogin();

  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  const submitPost = () => {
    if (!image) return window.alert("Post requires an image");
    const token = localStorage.getItem("access_token");

    axios
      .post(
        server + "/post",
        { userId: user._id, desc, img: image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setImage(undefined);
        setDesc("");
        window.alert("Post created successfully");
      });
  };

  const uploadImage = (file) => {
    setImageLoading(true);
    const form = new FormData();
    form.append("image", file);
    const token = localStorage.getItem("access_token");

    axios
      .post(server + "/image", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setImage(res.data.data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setImageLoading(false);
      });
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file.type.includes("image/"))
      return window.alert("Uploaded file is not an image");

    uploadImage(file);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitPost();
      }}
      className={`bg-slate-800 m-auto rounded-3xl text-center py-8 mt-10 w-full md:w-[35rem] ${
        imageLoading ? "cursor-wait" : "cursor-default"
      }`}
    >
      <span className="font-bold text-2xl">Share Something New!!</span>
      {image ? (
        <div className="w-96 relative aspect-video m-auto my-6">
          <Image src={image} className="rounded-2xl object-cover" fill alt="" />
        </div>
      ) : imageLoading ? (
        <div className="cursor-wait">
          <Uploading className="w-24 h-24 m-auto my-4 opacity-80" />
        </div>
      ) : (
        <label htmlFor="image" className="cursor-pointer">
          <PlusIcon className="w-24 m-auto mb-2" />
          <input
            id="image"
            type="file"
            className="hidden"
            onChange={handleUploadImage}
          />
        </label>
      )}

      <div className="w-3/4 flex m-auto gap-4 items-center">
        <textarea
          placeholder="Enter Description"
          rows={2}
          className="flex-1 bg-transparent resize-y border-b-2 border-b-slate-600 outline-none focus:border-b-slate-400 text-center"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <button
          type="submit"
          className={`self-stretch bg-transparent border-2 border-slate-500 px-6 py-2 rounded-lg transition hover:bg-slate-500 ${
            imageLoading ? "cursor-wait" : "cursor-pointer"
          }`}
          disabled={imageLoading}
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default AddPost;
