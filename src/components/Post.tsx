import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProfileContext } from "../contexts/ProfileContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export interface IPost {
  id: number;
  user_id: number;
  description: string;
  create_date: Date;
  modify_date: Date;
  first_name: string;
  last_name: string;
  profile_picture: string;
}

export interface ILike {
  id: number;
  post_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
}

export interface IComment {
  id: number;
  user_id: number;
  post_id: number;
  description: string;
  create_date: Date;
  modify_date: Date;
  first_name: string;
  last_name: string;
  profile_picture: string;
}

interface IProps {
  post: IPost;
  likes: ILike[];
  comments: IComment[];
}

const Post = (props: IProps) => {
  const { post, likes, comments } = props;
  const [liked, setLiked] = useState(false);
  const [stateLikes, setStateLikes] = useState(likes);
  const [showLikes, setShowLikes] = useState(false);
  const [stateComments, setStateComments] = useState(comments);
  const [showComments, setShowComments] = useState(false);
  const [commentDescription, setCommentDescription] = useState("");
  const [commentLength, setCommentLength] = useState(0);
  const [commentsError, setCommentsError] = useState<null | string>(null);
  const { user } = useContext(UserContext);
  const { profile } = useContext(ProfileContext);

  // Format current date
  const currDate = new Date(post.create_date);
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec."
  ];
  const weeks = ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."];
  const currYear = currDate.getUTCFullYear();
  const currMonth = months[currDate.getUTCMonth()];
  const currWeek = weeks[currDate.getUTCDay()];
  const currDay = currDate.getUTCDate();

  // Open Likes Modal
  const handleOpenLikes = () => {
    setShowLikes(true);
  };

  // Close Likes Modal
  const handleCloseLikes = () => {
    setShowLikes(false);
  };

  // Like or Unlike a Post
  const handleLike = async () => {
    if (!liked) {
      const response = await fetch(`/api/likes/${post.id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      data.profile_picture = profile.profile_picture;
      data.first_name = profile.first_name;
      data.last_name = profile.last_name;

      setStateLikes((prevStateLikes) => [data, ...prevStateLikes]);
      setLiked(true);

      console.log("created new like!");
    } else if (liked) {
      const response = await fetch(`/api/likes/${post.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      setStateLikes((prevStateLikes) =>
        prevStateLikes.filter((like) => like.user_id !== user.id)
      );
      setLiked(false);

      console.log("deleted a like!");
    }
  };

  // Open Comments Modal
  const handleOpenComments = () => {
    setShowComments(true);
  };

  // Close Comments Modal
  const handleCloseComments = () => {
    setShowComments(false);
  };

  const handleCommentInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setCommentDescription((e.target as HTMLTextAreaElement).value);
    setCommentLength((e.target as HTMLTextAreaElement).value.length);
  };

  // Create Comment
  const createComment = async () => {
    const response = await fetch(`/api/comments/${post.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({ description: commentDescription })
    });

    const data = await response.json();

    if (response.ok) {
      setStateComments(
        (prevStateComments) =>
          [
            ...prevStateComments,
            {
              id: data.id,
              user_id: data.user_id,
              post_id: data.post_id,
              description: data.description,
              create_date: data.create_date,
              modify_date: data.modify_date,
              first_name: profile.first_name,
              last_name: profile.last_name,
              profile_picture: profile.profile_picture
            }
          ] as IComment[]
      );
      setCommentsError(null);
      console.log("created new comment!");
    } else if (!response.ok) {
      setCommentsError(data.err);
    }
  };

  useEffect(() => {
    if (likes.filter((like) => like.user_id === user.id).length > 0) {
      setLiked(true);
    }
    setStateLikes(likes);
    setStateComments(comments);
  }, [likes, comments, user]);

  return (
    <div className="bg-white border-2 border-slate-300 rounded-lg mb-5 p-2">
      {/* Modal to display likes list */}
      <Modal
        open={showLikes}
        onClose={handleCloseLikes}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white p-4">
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            People who have liked this post:
          </Typography>
          <Typography
            id="modal-modal-description"
            component="span"
            sx={{ mt: 2 }}>
            {stateLikes.map((like) => (
              <div key={like.id} className="mb-4">
                <img
                  src={like.profile_picture}
                  alt="pic"
                  className="w-12 h-12 inline mx-2"
                />
                {like.first_name} {like.last_name}
              </div>
            ))}
          </Typography>
        </Box>
      </Modal>

      {/* Modal to display comments list */}
      <Modal
        open={showComments}
        onClose={handleCloseComments}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white p-4">
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Comments on this post:
          </Typography>
          <Typography
            id="modal-modal-description"
            component="span"
            sx={{ mt: 2 }}>
            {stateComments.map((comment) => (
              <div key={comment.id} className="mb-4 flex">
                <img
                  src={comment.profile_picture}
                  alt="pic"
                  className="w-12 h-12 inline mx-2"
                />
                <div>
                  <div className="font-bold text-lg">
                    {comment.first_name} {comment.last_name}
                  </div>
                  <div>{comment.description}</div>
                </div>
              </div>
            ))}
          </Typography>
        </Box>
      </Modal>

      {/* Post Content */}
      <div className="flex flex-row items-center">
        <img
          src={post.profile_picture}
          alt="pic"
          className="w-12 h-12 inline mx-2"
        />
        <span className="flex flex-col ml-2">
          <div className="text-2xl">
            {post.first_name} {post.last_name} {post.id}
          </div>
          <div>
            {currWeek} {currMonth} {currDay}, {currYear}
          </div>
        </span>
      </div>
      <div className="flex justify-between mx-2 my-2">
        <span className="text-2xl">{post.description}</span>
        <button
          onClick={handleLike}
          className={`ml-5 hover:cursor-pointer ${
            liked
              ? `bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-500 hover:bg-gradient-to-tr hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700`
              : `bg-purple-500 hover:bg-purple-700`
          } text-white px-2 py-1 rounded-lg font-bold`}>
          {liked ? `Liked!` : "Like"}
        </button>
      </div>
      <hr className="border-black"></hr>
      <div className="flex">
        <div
          onClick={handleOpenLikes}
          className="w-1/2 text-center my-2 border-r-2 border-black hover:cursor-pointer">
          Likes: {stateLikes.length}
        </div>
        <div
          onClick={handleOpenComments}
          className="w-1/2 text-center my-2 hover:cursor-pointer">
          Comments: {stateComments.length}
        </div>
      </div>
      <hr className="border-black"></hr>
      <div className="flex items-center mt-2 mx-2">
        <img
          src={profile.profile_picture}
          alt="user-pic"
          className="w-12 h-12 inline"
        />
        <div className="flex flex-col ml-5 w-4/5">
          <textarea
            maxLength={255}
            onInput={handleCommentInput}
            className="p-1 border-2 border-black"></textarea>
          <p className="text-[12px]">{commentLength}/255</p>
          {commentsError && <p className="text-red-500">{commentsError}</p>}
        </div>
        <button
          onClick={createComment}
          className="ml-5 bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-white px-4 py-2 rounded-lg font-bold">
          Reply
        </button>
      </div>
    </div>
  );
};

export default Post;
