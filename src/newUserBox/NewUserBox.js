import { useLogin } from "@/util/LoginContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import PlusIcon from "../components/icons/Plus";
import Login from "./Login";

const NewUserBox = () => {
  const { loadUser } = useLogin();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  const [showLogin, setShowLogin] = useState(false);

  const [signupPage, setSignupPage] = useState(0);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(false);

  const validateFirst = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(username, email);
    if (username.length < 3) return window.alert("Username too short");
    if (email.length < 3 || !email.includes("@") || !email.includes("."))
      return window.alert("Email not valid");

    axios
      .get(
        server + `/auth/check-name-email?username=${username}&email=${email}`
      )
      .then((res) => {
        // console.log(res);
        setSignupPage(1);
      })
      .catch((err) => {
        console.log(err);
        if (err && err.response) {
          if (err.response.status === 302) {
            if (err.response.data.for === "username")
              return window.alert("Username already exists");
            if (err.response.data.for === "email")
              return window.alert("Email already registered");
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validateSecond = (e) => {
    e.preventDefault();
    setLoading(true);
    if (password.length < 8) return window.alert("Password too short");
    if (password !== cpassword) return window.alert("Passwords don't match");
    setLoading(false);
    setSignupPage(2);
  };

  const createAccount = (e) => {
    e.preventDefault();
    if (name.length < 1) return window.alert("Name cannot be empty");
    axios
      .post(server + "/auth/register", {
        username,
        email,
        password,
        name,
        bio,
        profilePic: imageUrl,
      })
      .then((res) => {
        setShowLogin(true);
      })
      .catch((err) => {
        if (!err) return;
        console.log(err.response);
      });
  };

  if (showLogin)
    return (
      <Login
        setShowLogin={setShowLogin}
        afterLogin={() => {
          setShowLogin(true);
          loadUser();
        }}
      />
    );

  if (signupPage === 0)
    return (
      <form
        onSubmit={validateFirst}
        className="bg-slate-800 m-auto rounded-3xl text-center py-8 mt-10 w-full md:w-[35rem]"
      >
        <span className="block font-bold text-2xl">
          New Here? <u>Create Account now</u>
        </span>
        <label
          htmlFor="username"
          className="transition duration-200 flex w-1/2 m-auto justify-center items-center px-4 py-3 border-2 border-slate-600 rounded-lg gap-2 focus:border-slate-400 active:border-slate-400 focus-within:border-slate-400 mt-6 cursor-text"
        >
          <svg
            className="fill-slate-400 w-6 h-full "
            width="20"
            height="21"
            viewBox="0 0 20 21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 20.95H15V18.95H10C5.66 18.95 2 15.29 2 10.95C2 6.61001 5.66 2.95001 10 2.95001C14.34 2.95001 18 6.61001 18 10.95V12.38C18 13.17 17.29 13.95 16.5 13.95C15.71 13.95 15 13.17 15 12.38V10.95C15 8.19001 12.76 5.95001 10 5.95001C7.24 5.95001 5 8.19001 5 10.95C5 13.71 7.24 15.95 10 15.95C11.38 15.95 12.64 15.39 13.54 14.48C14.19 15.37 15.31 15.95 16.5 15.95C18.47 15.95 20 14.35 20 12.38V10.95C20 5.43001 15.52 0.950012 10 0.950012C4.48 0.950012 0 5.43001 0 10.95C0 16.47 4.48 20.95 10 20.95ZM10 13.95C8.34 13.95 7 12.61 7 10.95C7 9.29001 8.34 7.95001 10 7.95001C11.66 7.95001 13 9.29001 13 10.95C13 12.61 11.66 13.95 10 13.95Z"
              fill="inherit"
            />
          </svg>
          <input
            id="username"
            className="bg-transparent outline-none w-full"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label
          htmlFor="email"
          className="flex w-1/2 m-auto justify-center items-center px-4 py-3 border-2 border-slate-600 rounded-lg gap-2 focus:border-slate-400 active:border-slate-400 focus-within:border-slate-400 mt-4 cursor-text"
        >
          <svg
            className="fill-slate-400 w-6 h-full"
            width="20"
            height="16"
            viewBox="0 0 20 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 2C20 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2ZM18 2L10 7L2 2H18ZM18 14H2V4L10 9L18 4V14Z"
              fill="inherit"
            />
          </svg>
          <input
            id="email"
            className="bg-transparent outline-none w-full"
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <button
          className="bg-purple-900 px-4 py-2 w-1/2 rounded-lg mt-4 block m-auto disabled:bg-slate-600 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          Sign up
        </button>
        <span
          className="mt-2 block text-slate-300 cursor-pointer underline"
          onClick={() => {
            setShowLogin(true);
          }}
        >
          Login instead
        </span>
      </form>
    );

  if (signupPage === 1)
    return (
      <form
        className="bg-slate-800 m-auto rounded-3xl text-center py-8 mt-10 w-full md:w-[35rem]"
        onSubmit={validateSecond}
      >
        <span className="block font-bold text-2xl">
          Create a <u>Password</u>
        </span>
        {/* <label
          htmlFor="code"
          className="mt-6 transition duration-200 flex w-1/2 m-auto justify-center items-center px-4 py-3 border-2 border-slate-600 rounded-lg gap-2 focus:border-slate-400 active:border-slate-400 focus-within:border-slate-400 cursor-text"
        >
          <svg
            className="fill-slate-400 w-6 h-full "
            width="20"
            height="16"
            viewBox="0 0 20 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 2C20 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2ZM18 2L10 7L2 2H18ZM18 14H2V4L10 9L18 4V14Z"
              fill="inherit"
            />
          </svg>
          <input
            id="code"
            className="bg-transparent outline-none w-full"
            placeholder="Enter your code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
        </label>
        <span className="w-1/2 m-auto block text-start text-slate-400 text-sm">
          You would have recieved the code on the email you entered
        </span> */}
        <label
          htmlFor="password"
          className="mt-4 transition duration-200 flex w-1/2 m-auto justify-center items-center px-4 py-3 border-2 border-slate-600 rounded-lg gap-2 focus:border-slate-400 active:border-slate-400 focus-within:border-slate-400 cursor-text"
        >
          <svg
            className="fill-slate-400 w-6 h-full "
            width="22"
            height="16"
            viewBox="0 0 22 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 2.5C12.8387 2.49389 14.6419 3.00678 16.2021 3.97973C17.7624 4.95267 19.0164 6.34616 19.82 8C18.17 11.37 14.8 13.5 11 13.5C7.2 13.5 3.83 11.37 2.18 8C2.98362 6.34616 4.23763 4.95267 5.79788 3.97973C7.35813 3.00678 9.16126 2.49389 11 2.5ZM11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 5.5C11.663 5.5 12.2989 5.76339 12.7678 6.23223C13.2366 6.70107 13.5 7.33696 13.5 8C13.5 8.66304 13.2366 9.29893 12.7678 9.76777C12.2989 10.2366 11.663 10.5 11 10.5C10.337 10.5 9.70107 10.2366 9.23223 9.76777C8.76339 9.29893 8.5 8.66304 8.5 8C8.5 7.33696 8.76339 6.70107 9.23223 6.23223C9.70107 5.76339 10.337 5.5 11 5.5ZM11 3.5C8.52 3.5 6.5 5.52 6.5 8C6.5 10.48 8.52 12.5 11 12.5C13.48 12.5 15.5 10.48 15.5 8C15.5 5.52 13.48 3.5 11 3.5Z" />
          </svg>
          <input
            id="password"
            className="bg-transparent outline-none w-full"
            placeholder="Enter a password"
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <label
          htmlFor="cpassword"
          className="mt-4 transition duration-200 flex w-1/2 m-auto justify-center items-center px-4 py-3 border-2 border-slate-600 rounded-lg gap-2 focus:border-slate-400 active:border-slate-400 focus-within:border-slate-400 cursor-text"
        >
          <svg
            className="fill-slate-400 w-6 h-full "
            width="20"
            height="16"
            viewBox="0 0 20 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 2C20 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2ZM18 2L10 7L2 2H18ZM18 14H2V4L10 9L18 4V14Z"
              fill="inherit"
            />
          </svg>
          <input
            id="cpassword"
            className="bg-transparent outline-none w-full"
            placeholder="Confirm password"
            type="password"
            value={cpassword}
            onChange={(e) => {
              setCpassword(e.target.value);
            }}
          />
        </label>

        <button
          className="bg-purple-900 px-4 py-2 w-1/2 rounded-lg mt-4 block m-auto"
          type="submit"
        >
          Continue
        </button>
        <span
          className="mt-2 block text-slate-300 cursor-pointer underline"
          onClick={() => {
            setShowLogin(true);
          }}
        >
          Login instead
        </span>
      </form>
    );

  return (
    <form
      className="bg-slate-800 m-auto rounded-3xl text-center py-8 mt-10 w-full md:w-[35rem]"
      onSubmit={createAccount}
    >
      <span className="block font-bold text-2xl">
        Enter your <u>Details</u>
      </span>
      <label
        htmlFor="name"
        className="mt-6 transition duration-200 flex w-1/2 m-auto justify-center items-center px-4 py-3 border-2 border-slate-600 rounded-lg gap-2 focus:border-slate-400 active:border-slate-400 focus-within:border-slate-400 cursor-text"
      >
        <svg
          className="fill-slate-400 w-6 h-full "
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 0C9.06087 0 10.0783 0.421427 10.8284 1.17157C11.5786 1.92172 12 2.93913 12 4C12 5.06087 11.5786 6.07828 10.8284 6.82843C10.0783 7.57857 9.06087 8 8 8C6.93913 8 5.92172 7.57857 5.17157 6.82843C4.42143 6.07828 4 5.06087 4 4C4 2.93913 4.42143 1.92172 5.17157 1.17157C5.92172 0.421427 6.93913 0 8 0ZM8 2C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4C6 4.53043 6.21071 5.03914 6.58579 5.41421C6.96086 5.78929 7.46957 6 8 6C8.53043 6 9.03914 5.78929 9.41421 5.41421C9.78929 5.03914 10 4.53043 10 4C10 3.46957 9.78929 2.96086 9.41421 2.58579C9.03914 2.21071 8.53043 2 8 2ZM8 9C10.67 9 16 10.33 16 13V16H0V13C0 10.33 5.33 9 8 9ZM8 10.9C5.03 10.9 1.9 12.36 1.9 13V14.1H14.1V13C14.1 12.36 10.97 10.9 8 10.9Z" />
        </svg>

        <input
          id="name"
          className="bg-transparent outline-none w-full"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
      <label
        htmlFor="bio"
        className="mt-4 transition duration-200 flex w-1/2 m-auto justify-center items-center px-4 py-3 border-2 border-slate-600 rounded-lg gap-2 focus:border-slate-400 active:border-slate-400 focus-within:border-slate-400 cursor-text"
      >
        <svg
          className="fill-slate-400 w-6 h-full "
          width="18"
          height="18"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 16H16V6.825L11.175 2H2V16ZM2 18C1.45 18 0.979002 17.804 0.587002 17.412C0.195002 17.02 -0.000664969 16.5493 1.69779e-06 16V2C1.69779e-06 1.45 0.196002 0.979002 0.588002 0.587002C0.980002 0.195002 1.45067 -0.000664969 2 1.69779e-06H12L18 6V16C18 16.55 17.804 17.021 17.412 17.413C17.02 17.805 16.5493 18.0007 16 18H2ZM4 14H14V12H4V14ZM4 10H14V8H4V10ZM4 6H11V4H4V6Z" />
        </svg>

        <input
          id="bio"
          className="bg-transparent outline-none w-full"
          placeholder="Enter a cool bio"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
      </label>

      {/* <label
        htmlFor="image"
        className="mt-4 transition duration-200 flex w-1/2 m-auto justify-center items-center px-4 py-3 border-2 border-slate-600 rounded-lg gap-2 focus:border-slate-400 active:border-slate-400 focus-within:border-slate-400 cursor-pointer flex-col"
      >
        {imageUrl ? (
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              className="object-cover rounded-xl"
              src={imageUrl}
              fill
              alt=""
            />
          </div>
        ) : (
          <>
            <PlusIcon className="w-10 h-10" />
            <span className="text-slate-400">Enter a nice profile pic</span>
            <input
              id="image"
              className="hidden"
              placeholder="Enter a cool bio"
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImageUrl(
                  "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                );
              }}
            />
          </>
        )}
      </label> */}
      <label
        htmlFor="image"
        className="mt-4 transition duration-200 flex w-1/2 m-auto justify-center items-center px-4 py-3 border-2 border-slate-600 rounded-lg gap-2 focus:border-slate-400 active:border-slate-400 focus-within:border-slate-400 cursor-text"
      >
        <svg
          className="fill-slate-400 w-6 h-full "
          width="18"
          height="18"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 18C1.45 18 0.979002 17.804 0.587002 17.412C0.195002 17.02 -0.000664969 16.5493 1.69779e-06 16V2C1.69779e-06 1.45 0.196002 0.979002 0.588002 0.587002C0.980002 0.195002 1.45067 -0.000664969 2 1.69779e-06H16C16.55 1.69779e-06 17.021 0.196002 17.413 0.588002C17.805 0.980002 18.0007 1.45067 18 2V16C18 16.55 17.804 17.021 17.412 17.413C17.02 17.805 16.5493 18.0007 16 18H2ZM3 9.575L6.3 6.275C6.4 6.175 6.50834 6.104 6.625 6.062C6.74167 6.02 6.86667 5.99934 7 6C7.13334 6 7.25834 6.02067 7.375 6.062C7.49167 6.10334 7.6 6.17433 7.7 6.275L11 9.575L14.3 6.275C14.4 6.175 14.5083 6.104 14.625 6.062C14.7417 6.02 14.8667 5.99934 15 6C15.1333 6 15.2583 6.02067 15.375 6.062C15.4917 6.10334 15.6 6.17433 15.7 6.275L16 6.575V2H2V8.575L3 9.575ZM2 16H16V9.4L15 8.4L11.7 11.7C11.6167 11.7833 11.5123 11.85 11.387 11.9C11.2617 11.95 11.1327 11.975 11 11.975C10.8667 11.975 10.7417 11.95 10.625 11.9C10.5083 11.85 10.4 11.7833 10.3 11.7L7 8.4L3.7 11.7C3.6 11.8 3.49167 11.871 3.375 11.913C3.25834 11.955 3.13334 11.9757 3 11.975C2.86667 11.975 2.74167 11.9543 2.625 11.913C2.50834 11.8717 2.4 11.8007 2.3 11.7L2 11.4V16ZM2 16V9.4V11.4V2V16Z" />
        </svg>

        <input
          id="image"
          className="bg-transparent outline-none w-full"
          placeholder="Link to your profile pic"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
        />
      </label>
      <span className="w-1/2 m-auto block text-start text-slate-400 text-sm">
        Image uploading is under working
      </span>

      <button
        className="bg-purple-900 px-4 py-2 w-1/2 rounded-lg mt-4 block m-auto"
        type="submit"
      >
        Create Account
      </button>
      <span
        className="mt-2 block text-slate-300 cursor-pointer underline"
        onClick={() => {
          setShowLogin(true);
        }}
      >
        Login instead
      </span>
    </form>
  );
};

export default NewUserBox;
