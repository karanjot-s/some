import UserBox from "@/components/UserBox";
import Post from "@/components/utils/Post";
import SearchBar from "@/components/utils/SearchBar";
import SelectionBox from "@/components/utils/SelectionBox";
import { useLogin } from "@/context/Login";
import { getPosts, getUsers } from "@/utils/getData";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const types = {
  all: 0,
  saved: 1,
};

const Profile = () => {
  // const posts = getPosts();
  // const users = getUsers();

  const { user: currentUser } = useLogin();

  const router = useRouter();
  const { username } = router.query;

  const [user, setUser] = useState();
  const [type, setType] = useState(types.saved);

  useEffect(() => {
    if (!username) return;
    axios
      .get(process.env.NEXT_PUBLIC_SERVER_URL + "/user/" + username)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  // const user = users.find((u) => u.username === username);
  // const currentUser = "karanjot";

  const [posts, setPosts] = useState([]);
  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    if (!username || !user) return;
    // console.log(user._id);
    const token = window.localStorage.getItem("access_token");
    if (!token) return;
    if (
      currentUser &&
      user.username === currentUser.username &&
      type === types.saved
    ) {
      axios
        .get(server + "/post/saved", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log(res);
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(server + "/post/user/" + user._id, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log(res);
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [server, username, user, type, currentUser]);

  if (!username) return <>Loading</>;
  if (!user) return <>User not found</>;

  // const userPosts = posts.filter((post) => post.userId === user.userId);
  // console.log(userPosts);

  return (
    <div className="w-full pt-8">
      <SearchBar />
      <UserBox
        user={user}
        current={currentUser && user.username === currentUser.username}
      />
      <SelectionBox
        item={type}
        allItems={[
          { text: "All", value: types.all },
          { text: "Saved", value: types.saved },
        ]}
        changeItem={setType}
        hidden={!(currentUser && user.username === currentUser.username)}
      />
      <div className="flex flex-col gap-20 mt-10">
        {posts.map((post, i) => (
          <Post key={i} postData={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
