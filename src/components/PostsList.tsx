import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Post, { IPost } from "./Post";

const PostsList = () => {
  const [posts, setPosts] = useState([] as IPost[]);
  const { user } = useContext(UserContext);
  // let postLength = 0;
  const [postLength, setPostLength] = useState(0);

  const handlePostInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setPostLength((e.target as HTMLTextAreaElement).value.length);
  };

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
  }, [user]);

  return (
    <div className="col-span-2 bg-white rounded-lg p-4">
      <div className="border-2 border-slate-300 rounded-lg mb-5 p-2">
        <textarea
          placeholder="Write a Post!"
          maxLength={255}
          onInput={handlePostInput}
          className="w-full p-2 border-2 border-black"></textarea>
        <div className="flex justify-between">
          <span className="text-[12px]">{postLength}/255</span>
          <button className="ml-5 bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-white px-4 py-2 rounded-lg font-bold">
            Add Post
          </button>
        </div>
      </div>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostsList;
