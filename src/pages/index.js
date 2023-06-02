import AddPost from "@/components/AddPost";
import NewUserBox from "@/newUserBox/NewUserBox";
import Post from "@/components/utils/Post";
import SearchBar from "@/components/utils/SearchBar";
import { getPosts, getUsers } from "@/utils/getData";
import { useLogin } from "@/context/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import SelectionBox from "@/components/utils/SelectionBox";

const types = {
  followers: 0,
  all: 1,
};

export default function Home() {
  const { user } = useLogin();
  // const posts = getPosts();
  const users = getUsers();
  const [posts, setPosts] = useState([]);
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [type, setType] = useState(types.followers);

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    if (!token) return;
    if (type === types.followers) {
      axios
        .get(server + "/post/followed", {
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
        .get(server + "/post/all", {
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
  }, [server, type]);

  return (
    <div className="w-full pt-8">
      <SearchBar />
      <AddPost />

      <SelectionBox
        item={type}
        allItems={[
          { text: "Followed", value: types.followers },
          { text: "All Posts", value: types.all },
        ]}
        changeItem={setType}
      />
      <div className="flex flex-col gap-20 mt-20">
        {posts.map((post, i) => (
          <Post key={i} postData={post} />
        ))}
      </div>
    </div>
  );
}
