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

  if (!post) return <>Loading...</>;

  return (
    <div style={{ margin: "auto" }}>
      <Post postData={post} />
    </div>
  );
};

export default PostPage;
