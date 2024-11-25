import axios from "axios";
import React, { useState } from "react";

const Login = ({ setShowLogin, afterLogin }) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [luser, setLuser] = useState("");
  const [lpass, setLpass] = useState("");

  const [loading, setLoading] = useState(false);

  const onLogin = () => {
    // console.log(luser, lpass);
    setLoading(true);
    axios
      .post(server + "/auth/login", { email: luser, password: lpass })
      .then((res) => {
        // console.log(res.data);

        window.localStorage.setItem("access_token", res.data.token);

        afterLogin(res.data.token);
        // afterLogin()
      })
      .catch((err) => {
        if (!err) return;

        console.log(err);

        if (!err.response) return;

        // console.log(err.response.data.message);
        if (
          err.response.data.code === "USER_NOT_FOUND" ||
          err.response.data.code === "INCORRECT_PASSWORD"
        )
          window.alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onLogin();
      }}
      className="bg-slate-800 m-auto rounded-3xl text-center py-8 mt-10 w-full md:w-[35rem]"
    >
      <span className="block font-bold text-2xl">
        Welcome Back, <u>Login below</u>
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
          placeholder="Enter your email"
          type="email"
          value={luser}
          onChange={(e) => {
            setLuser(e.target.value);
          }}
        />
      </label>
      <label
        htmlFor="password"
        className="flex w-1/2 m-auto justify-center items-center px-4 py-3 border-2 border-slate-600 rounded-lg gap-2 focus:border-slate-400 active:border-slate-400 focus-within:border-slate-400 mt-4 cursor-text"
      >
        <svg
          className="fill-slate-400 w-6 h-full "
          width="22"
          height="16"
          viewBox="0 0 22 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 2.5C12.8387 2.49389 14.6419 3.00678 16.2021 3.97973C17.7624 4.95267 19.0164 6.34616 19.82 8C18.17 11.37 14.8 13.5 11 13.5C7.2 13.5 3.83 11.37 2.18 8C2.98362 6.34616 4.23763 4.95267 5.79788 3.97973C7.35813 3.00678 9.16126 2.49389 11 2.5ZM11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 5.5C11.663 5.5 12.2989 5.76339 12.7678 6.23223C13.2366 6.70107 13.5 7.33696 13.5 8C13.5 8.66304 13.2366 9.29893 12.7678 9.76777C12.2989 10.2366 11.663 10.5 11 10.5C10.337 10.5 9.70107 10.2366 9.23223 9.76777C8.76339 9.29893 8.5 8.66304 8.5 8C8.5 7.33696 8.76339 6.70107 9.23223 6.23223C9.70107 5.76339 10.337 5.5 11 5.5ZM11 3.5C8.52 3.5 6.5 5.52 6.5 8C6.5 10.48 8.52 12.5 11 12.5C13.48 12.5 15.5 10.48 15.5 8C15.5 5.52 13.48 3.5 11 3.5Z"
            fill="inherit"
          />
        </svg>
        <input
          id="password"
          className="bg-transparent outline-none w-full"
          placeholder="Enter password"
          type="password"
          value={lpass}
          onChange={(e) => {
            setLpass(e.target.value);
          }}
        />
      </label>
      <button
        className="bg-purple-900 px-4 py-2 w-1/2 rounded-lg mt-4 block m-auto disabled:bg-slate-600 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        Login
      </button>
      <span
        className="mt-2 block text-slate-300 cursor-pointer underline"
        onClick={() => {
          setShowLogin(false);
        }}
      >
        Create Account instead
      </span>
    </form>
  );
};

export default Login;
