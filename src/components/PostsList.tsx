import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import { IUser, UserContext } from "../contexts/UserContext";
import Post, { IPost } from "./Post";

const PostsList = () => {
  const [description, setDescription] = useState("");
  const [postLength, setPostLength] = useState(0);
  const [posts, setPosts] = useState([] as IPost[]);
  const { user } = useContext(UserContext);
  const { profile } = useContext(ProfileContext);

  const handlePostInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setDescription((e.target as HTMLTextAreaElement).value);
    setPostLength((e.target as HTMLTextAreaElement).value.length);
  };

  const createPost = async () => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({
        description: description
      })
    });

    const data = await response.json();
    console.log(data);

    setPosts(
      (prevPosts) =>
        [
          {
            id: data.id,
            user_id: data.user_id,
            description: data.description,
            create_date: data.create_date,
            modify_date: data.modify_date,
            first_name: profile.first_name,
            last_name: profile.last_name,
            profile_picture: profile.profile_picture
          },
          ...prevPosts
        ] as IPost[]
    );
    console.log("created new post!");
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
    <div className="col-span-2 bg-white rounded-lg p-4 overflow-auto">
      <div className="border-2 border-slate-300 rounded-lg mb-5 p-2">
        <textarea
          placeholder="Write a Post!"
          maxLength={255}
          onInput={handlePostInput}
          className="w-full p-2 border-2 border-black"></textarea>
        <div className="flex justify-between">
          <span className="text-[12px]">{postLength}/255</span>
          <button
            onClick={createPost}
            className="ml-5 bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-white px-4 py-2 rounded-lg font-bold">
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
