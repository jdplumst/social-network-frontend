import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Post, { IPost } from "./Post";

const PostsList = () => {
  const [posts, setPosts] = useState([] as IPost[]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/api/posts", {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await response.json();
      setPosts(data);
      console.log("fetched all posts!");
    };
    getPosts();
  }, []);

  return (
    <div className="col-span-2 bg-white rounded-lg p-4">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostsList;
