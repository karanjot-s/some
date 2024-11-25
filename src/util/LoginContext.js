import NewUserBox from "@/newUserBox/NewUserBox";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export const LoginContext = React.createContext({
  user: null,
  setUser: async () => null,
  loadUser: async () => {},
});

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const loadUser = () => {
    const token = window.localStorage.getItem("access_token");
    setLoading(true);
    axios
      .get(process.env.NEXT_PUBLIC_SERVER_URL + "/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data.user);
      })
      .catch((err) => {
        window.localStorage.removeItem("access_token");
        if (!err) return;
        if (!err.response) return;
        if (err.response.status === 403) return;
        // console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (window.localStorage.getItem("access_token")) loadUser();
  }, []);

  if (loading) return <>Loading...</>;

  if (!user)
    return (
      <LoginContext.Provider value={{ user, setUser, loadUser }}>
        <NewUserBox />
      </LoginContext.Provider>
    );

  return (
    <LoginContext.Provider value={{ user, setUser, loadUser }}>
      {children}
    </LoginContext.Provider>
  );
};
