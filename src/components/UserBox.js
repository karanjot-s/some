import { useLogin } from "@/context/Login";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import EditBox from "./EditBox";
import UserIcon from "./icons/User";

const UserBox = ({ user, current }) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [edit, setEdit] = useState(false);
  const { user: currentUser, setUser } = useLogin();
  const [loading, setLoading] = useState(false);

  const [following, setFollowing] = useState(
    currentUser.following.includes(user._id)
  );

  const logout = () => {
    setUser(undefined);
    window.localStorage.removeItem("access_token");
  };

  const follow = (follow) => {
    const url = follow ? "follow" : "unfollow";
    const id = user._id;
    const token = window.localStorage.getItem("access_token");
    setLoading(true);
    axios
      .put(
        server + `/user/${id}/${url}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setFollowing((old) => !old);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div
        style={{ width: "35rem" }}
        className="bg-slate-800 m-auto rounded-3xl text-center py-8 mt-10"
      >
        {user.profilePic ? (
          <div className="w-20 relative aspect-square m-auto">
            <Image
              src={user.profilePic}
              className="rounded-full object-cover"
              fill
              alt=""
            />
          </div>
        ) : (
          <UserIcon color="#64748B" className="m-auto" />
        )}

        <span className="mt-2 block text-3xl font-bold text-slate-300">
          {user.name}
        </span>
        <span className="block text-xl font-medium text-slate-400">
          @{user.username}
        </span>
        {current && !edit ? (
          <div className="mt-4">
            <button
              className="bg-transparent border-2 border-slate-500 px-6 py-2 rounded-lg transition hover:bg-slate-500 mr-2"
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit
            </button>
            <button
              className="bg-transparent border-2 border-red-500 px-6 py-2 rounded-lg transition hover:bg-red-500"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <></>
        )}
        {!current && !loading ? (
          <button
            className="bg-transparent border-2 border-slate-500 px-6 py-2 rounded-lg transition hover:bg-slate-500 mt-2"
            onClick={() => {
              follow(!following);
            }}
          >
            {following ? "Unfollow" : "Follow"}
          </button>
        ) : (
          ""
        )}
      </div>
      {edit ? (
        <EditBox
          user={currentUser}
          close={() => {
            setEdit(false);
          }}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default UserBox;
