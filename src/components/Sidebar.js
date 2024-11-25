import { useLogin } from "@/util/LoginContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ArrowIcon from "./icons/Arrow";
import BellIcon from "./icons/Bell";
import ChatIcon from "./icons/Chat";
import HomeIcon from "./icons/Home";
import LogoIcon from "./icons/Logo";
import UserIcon from "./icons/User";
import SearchIcon from "./icons/Search";
import BigSearchIcon from "./icons/BigSearch";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const currentUser = "karanjot";

  const { user } = useLogin();
  // console.log(user);

  const colors = {
    enabled: "#94A3B8",
    disabled: "#64748B",
  };

  const links = [
    { Icon: HomeIcon, text: "Home", link: "/" },
    { Icon: ChatIcon, text: "Chat", link: "/chat" },
    { Icon: BigSearchIcon, text: "Search", link: "/search" },
  ];

  const router = useRouter();
  return (
    <div className="border-slate-700 px-4 py-2 flex items-center fixed transition-all w-full left-0 bottom-0 z-20 bg-slate-900 border-t-2 justify-center gap-8 shadow-md md:shadow-none md:gap-0 md:border-r-2 md:border-t-0 md:w-fit md:h-full md:flex-col md:justify-between">
      <Link
        href="/"
        className={`justify-center items-center text-3xl font-bold text-violet-400 hidden md:flex`}
      >
        <LogoIcon className="w-14" />
        <span
          className={`${
            open ? "w-full" : "w-0"
          } overflow-hidden transition-all`}
        >
          SoMe
        </span>
      </Link>
      <div className="flex justify-center items-center md:items-start md:flex-col gap-4">
        {links.map((link, ind) => (
          <Link
            key={ind}
            href={link.link}
            className={`flex justify-center items-center text-3xl font-medium ${
              router.pathname === link.link
                ? "text-slate-500"
                : "text-slate-400"
            }`}
          >
            <link.Icon
              className={`w-14 transition duration-300 ${
                router.pathname === link.link
                  ? "fill-slate-500"
                  : "fill-slate-400"
              }`}
            />
            <span
              className={`${
                open ? "w-full" : "w-0"
              } overflow-hidden transition-all`}
            >
              {link.text}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center md:flex-col">
        {/* <div
          className="cursor-pointer hidden md:flex"
          onClick={() => {
            setOpen((old) => !old);
          }}
        >
          <ArrowIcon
            className={`w-full transition ${open ? "rotate-180" : ""}`}
          />
        </div> */}
        {user ? (
          <Link
            href={`/u/${user.username}`}
            className={`flex justify-center items-center text-3xl font-bold text-violet-400 gap-2`}
          >
            {user.profilePic ? (
              <div className="w-14 relative aspect-square m-auto mt-2">
                <Image
                  src={user.profilePic}
                  className="rounded-full object-cover"
                  fill
                  alt=""
                />
              </div>
            ) : (
              <UserIcon classname="w-20" />
            )}
            <span
              className={`${
                open ? "w-full" : "w-0"
              } overflow-hidden transition-all`}
            >
              Profile
            </span>
          </Link>
        ) : (
          <div
            className={`flex justify-center items-center text-3xl font-bold text-violet-400`}
            onClick={() => {
              window.alert(
                "Want to access your profile? Why not create an account first."
              );
            }}
          >
            <UserIcon classname="w-20" />
            <span
              className={`${
                open ? "w-full" : "w-0"
              } overflow-hidden transition-all`}
            >
              Profile
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
