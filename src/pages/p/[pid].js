import LoadingIcon from "@/components/icons/Loading";
import Post from "@/components/utils/Post";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PostPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [post, setPost] = useState();

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_SERVER_URL + `/post/${pid}`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [pid]);

  console.log(pid);

  if (!post)
    return (
      <div className="w-full flex items-center justify-center">
        <LoadingIcon />
      </div>
    );

  return (
    <div className="m-auto w-full">
      <Post postData={post} />
    </div>
  );
};

export default PostPage;
