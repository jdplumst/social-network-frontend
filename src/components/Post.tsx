import { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";

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
  post_id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
}

interface IProps {
  post: IPost;
  likes: ILike[];
}

const Post = (props: IProps) => {
  const { post, likes } = props;
  // const [load, setLoad] = useState(true);
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

  return (
    <div className="border-2 border-slate-300 rounded-lg mb-5 p-2">
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
      <div className="text-2xl mx-2 my-2">{post.description}</div>
      <hr className="border-black"></hr>
      <div className="flex">
        <div
          // onClick={getLikes}
          className="w-1/2 text-center my-2 border-r-2 border-black">
          Likes: {likes.length}
        </div>
        <div className="w-1/2 text-center my-2">Comments: 0</div>
      </div>
      <hr className="border-black"></hr>
      <div className="flex items-center mt-2 mx-2">
        <img
          src={profile.profile_picture}
          alt="user-pic"
          className="w-12 h-12 inline"
        />
        <textarea
          maxLength={100}
          className="ml-5 w-4/5 p-1 border-2 border-black"></textarea>
        <button className="ml-5 bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-white px-4 py-2 rounded-lg font-bold">
          Reply
        </button>
      </div>
    </div>
  );
};

export default Post;
