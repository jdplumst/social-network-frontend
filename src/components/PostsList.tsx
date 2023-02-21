import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import { UserContext } from "../contexts/UserContext";
import Post, { IPost, ILike } from "./Post";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PostsList = () => {
  const [description, setDescription] = useState("");
  const [postLength, setPostLength] = useState(0);
  const [posts, setPosts] = useState([] as IPost[]);
  const [likes, setLikes] = useState([] as ILike[]);
  const { user } = useContext(UserContext);
  const { profile } = useContext(ProfileContext);

  // Pagination
  const [firstPost, setFirstPost] = useState(0);
  const [lastPost, setLastPost] = useState(9);
  let currPosts = posts.slice(firstPost, lastPost);

  const handlePostInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setDescription((e.target as HTMLTextAreaElement).value);
    setPostLength((e.target as HTMLTextAreaElement).value.length);
  };

  const changePage = (e: React.ChangeEvent<unknown>, page: number) => {
    if (page === 1) {
      setFirstPost(0);
    } else {
      setFirstPost((page - 1) * 10 - 1);
    }
    setLastPost(page * 10 - 1);
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
    const getPostsAndLikes = async () => {
      // Fetch Posts
      const postsResponse = await fetch("/api/posts", {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const postsData = await postsResponse.json();
      setPosts(postsData);
      console.log("fetched all posts!");

      // Fetch Likes
      const likesResponse = await fetch(`/api/likes`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const likesData = await likesResponse.json();
      setLikes(likesData);
      console.log("fetched all likes!");
    };

    getPostsAndLikes();
  }, [user]);

  return (
    <div className="col-span-2 bg-white rounded-lg p-4 overflow-auto">
      {/* Text Area to create Posts */}
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

      {/* List of Posts */}
      {currPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          likes={likes.filter((like) => like.post_id === post.id)}
        />
      ))}
      <div className="flex justify-center">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(posts.length / 10)}
            color="secondary"
            onChange={changePage}
          />
        </Stack>
      </div>
    </div>
  );
};

export default PostsList;
