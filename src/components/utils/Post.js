import { useLogin } from "@/util/LoginContext";
import { getDateDiff } from "@/utils/dateManip";
import axios from "axios";
import Link from "next/link";
import React from "react";
import CommentIcon from "../icons/Comment";
import LikeIcon from "../icons/Like";
import ShareIcon from "../icons/Share";
import UserIcon from "../icons/User";
import BookmarkIcon from "../icons/Bookmark";
import Image from "next/image";

const Post = ({ postData }) => {
  const { user } = useLogin();
  // console.log(postData);
  if (!postData) return;
  const post = {
    user: {
      name: postData.user ? postData.user.name : postData.name,
      username: postData.user ? postData.user.username : postData.username,
      avatar: postData.user ? postData.user.profilePic : postData.profilePic,
    },
    time: new Date(postData.createdAt),
    image: postData.img,
    description: postData.desc,
    liked: postData.likes.includes(user._id),
    saved: user.savedPosts.includes(postData._id),
  };
  return (
    <div className="m-auto w-full md:w-[35rem] -mb-40">
      <Link
        href={`/u/${post.user.username}`}
        className="flex flex-row justify-between items-center mb-4"
      >
        <div className="flex flex-row">
          {post.user.avatar ? (
            <div className="w-10 h-10 m-1 relative rounded-full">
              <Image
                src={post.user.avatar}
                alt=""
                fill
                className="object-cover rounded-full"
              />
            </div>
          ) : (
            <UserIcon color="#64748B" className="w-12 h-12" />
          )}
          <div className="flex flex-col ml-2">
            <span>{post.user.name}</span>
            <span className="text-slate-400">@{post.user.username}</span>
          </div>
        </div>
        <span className="text-slate-400">{getDateDiff(post.time)}</span>
      </Link>
      <div>
        <div
          style={{
            backgroundImage: `url("${post.image}")`,
          }}
          className="aspect-video rounded-t-3xl bg-cover"
        ></div>
        <div
          className="relative -top-40 pt-24 rounded-b-3xl px-4"
          style={{
            background:
              "linear-gradient(0deg, rgba(30,41,59,1) 0%, rgba(30,41,59,1) 40%, rgba(30,41,59,.85) 60%, rgba(30,41,59,0) 100%)",
          }}
        >
          <p className="text-justify">{post.description}</p>
          <div className="flex justify-between pt-4">
            <div className="flex gap-3">
              <LikeIcon
                className="w-14"
                initial={post.liked}
                onChange={(liked) => {
                  const id = postData._id;
                  const token = window.localStorage.getItem("access_token");

                  axios
                    .put(
                      process.env.NEXT_PUBLIC_SERVER_URL + `/post/${id}/like`,
                      {},
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />
              {/* <CommentIcon className="w-14 cursor-pointer" /> */}
            </div>
            <div className="flex gap-2">
              <Link href={`p/${postData._id}`}>
                <ShareIcon className="w-14 cursor-pointer" />
              </Link>
              <BookmarkIcon
                className="w-14 cursor-pointer"
                initial={post.saved}
                onChange={(saved) => {
                  const token = window.localStorage.getItem("access_token");
                  axios
                    .post(
                      process.env.NEXT_PUBLIC_SERVER_URL +
                        `/post/save/${postData._id}`,
                      {},
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .catch((err) => {
                      console.log(err.response);
                    });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
