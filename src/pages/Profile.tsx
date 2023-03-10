import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ProfileContext, IProfile } from "../contexts/ProfileContext";
import Navbar from "../components/Navbar";
import useGetProfiles from "../hooks/useGetProfiles";
import Post, { IComment, ILike, IPost } from "../components/Post";

const Profile = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { profile } = useContext(ProfileContext);
  const { getProfiles } = useGetProfiles();
  const [currProfile, setCurrProfile] = useState({} as IProfile);
  const [following, setFollowing] = useState(false);
  const [posts, setPosts] = useState([] as IPost[]);
  const [likes, setLikes] = useState([] as ILike[]);
  const [comments, setComments] = useState([] as IComment[]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const getProfileandPosts = async () => {
      // Fetch Profile
      const profileResponse = await fetch(`/api/profiles/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        setError(profileData.error);
      } else if (!profileData) {
        setError("No such profile");
      } else {
        setError(null);
        setCurrProfile(profileData);
        console.log("fetched profile!");
      }

      // Fetch Posts
      const postsResponse = await fetch(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const postsData = await postsResponse.json();
      if (postsResponse.ok) {
        setPosts(postsData);
        console.log("fetched posts for user!");
      }

      // Fetch Likes
      const likesResponse = await fetch(`/api/likes`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const likesData = await likesResponse.json();
      setLikes(likesData);
      console.log("fetched all likes!");

      // Fetch Comments
      const commentsResponse = await fetch("/api/comments", {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const commentsData = await commentsResponse.json();
      setComments(commentsData);
      console.log("fetched all comments!");
    };

    if (user.token) {
      getProfileandPosts();
      getProfiles();
    }
  }, [id, user]);

  return (
    <div>
      <Navbar />
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="flex flex-col items-center bg-slate-300 min-h-screen">
          <div className="p-5">
            <img
              src={currProfile.profile_picture}
              alt="pic"
              className="w-52 h-52 inline mx-2"
            />
          </div>
          <div className="bg-white min-w-1/2 border-2 border-black">
            <h3 className="text-3xl font-bold text-center">
              {currProfile.first_name} {currProfile.last_name}
            </h3>
            <div className="grid grid-cols-3 p-5 gap-5">
              <p>
                <strong>Location: </strong>
                {currProfile.location}
              </p>
              <p>
                <strong>Occupation: </strong>
                {currProfile.occupation}
              </p>
              <p>
                <strong>Followers: </strong>0
              </p>
              <p>
                <strong>Gender: </strong>
                {currProfile.gender}
              </p>
              <p>
                <strong>Birthday: </strong>{" "}
                {new Date(currProfile.birthday).toLocaleDateString()}
              </p>
              <p>
                <strong>Following: </strong>0
              </p>
            </div>
            {profile.user_id !== currProfile.user_id && (
              <div className="flex justify-center pb-5">
                <button
                  className={`hover:cursor-pointer ${
                    following
                      ? `bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-500 hover:bg-gradient-to-tr hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700`
                      : `bg-purple-500 hover:bg-purple-700`
                  } text-white px-2 py-1 rounded-lg font-bold w-1/5`}>
                  {following ? `Following` : `Follow`}
                </button>
              </div>
            )}
          </div>
          <div
            className={`grid ${
              posts.length > 1 ? "grid-cols-2 w-screen" : "w-3/4"
            } gap-y-10 p-10`}>
            {posts
              .filter((post) => post.user_id === parseInt(currProfile.user_id))
              .map((post) => (
                <div key={post.id} className="justify-self-center w-10/12">
                  <Post
                    post={post}
                    likes={likes.filter((like) => like.post_id === post.id)}
                    comments={comments.filter(
                      (comment) => comment.post_id === post.id
                    )}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
