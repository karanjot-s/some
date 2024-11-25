import React from "react";
import UserIcon from "../icons/User";
import Image from "next/image";
import Link from "next/link";

const ProfileHeader = ({ user }) => {
  return (
    <Link href={`/u/${user.username}`}>
      <div className="flex flex-row bg-slate-800 rounded-xl px-4 py-2">
        {user.profilePic ? (
          <div className="w-10 h-10 m-1 relative rounded-full">
            <Image
              src={user.profilePic}
              alt=""
              fill
              className="object-cover rounded-full"
            />
          </div>
        ) : (
          <UserIcon color="#64748B" className="w-12 h-12" />
        )}
        <div className="flex flex-col ml-2">
          <span>{user.name}</span>
          <span className="text-slate-400">@{user.username}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProfileHeader;
