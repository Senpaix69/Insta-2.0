import {
  BookmarkIcon,
  ChatAlt2Icon,
  EmojiHappyIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { XCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  doc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Moment from "react-moment";
import { postView } from "../atoms/states";
import { useRecoilState } from "recoil";
import { useCollectionData } from "react-firebase-hooks/firestore";
import sendPush from "../utils/sendPush";

const Post = ({
  post,
  router,
  deletePost,
  user,
  visitor,
  openComments,
  setOpenLikes,
  setPostLikes,
  setOpenComments,
  setPostComments,
  setCurPost,
}) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [hasLike, setHasLike] = useState(false);
  const [view, setView] = useRecoilState(postView);

  let unsubscribe = null;
  const [likes] = useCollectionData(
    query(
      collection(db, `posts/${post.id}/likes`),
      orderBy("timeStamp", "desc")
    )
  );

  useEffect(() => {
    setView(false);
  }, [router]);

  useEffect(() => {
    unsubscribe = onSnapshot(
      query(
        collection(db, "posts", post.id, "comments"),
        orderBy("timeStamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
    return () => unsub();
  }, [post.id]);

  useEffect(() => {
    if (likes) {
      setHasLike(
        likes.findIndex((like) => like.username === visitor.username) !== -1
      );
    }
  }, [likes, visitor]);

  const likePost = async () => {
    if (hasLike) {
      await deleteDoc(doc(db, "posts", post.id, "likes", visitor.uid));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", visitor.uid), {
        username: visitor.username,
        timeStamp: serverTimestamp(),
      }).then(() => {
        sendNotification("has liked your post");
      });
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", post.id, "comments"), {
      comment: commentToSend,
      username: visitor.username,
      userImg: visitor.image,
      timeStamp: serverTimestamp(),
      subcomments: [],
    }).then(() => {
      sendNotification("has commented to your post");
    });
  };

  const sendNotification = (message) => {
    if (user.username !== visitor.username) {
      sendPush(
        user.uid,
        "",
        visitor.fullname ? visitor.fullname : visitor.username,
        message,
        ""
      );
    }
  };

  useEffect(() => {
    if (openComments) {
      setPostComments(comments);
    }
  }, [comments]);

  const getLength = (comments) => {
    let len = comments?.length;
    comments?.forEach((comment) => {
      len += comment.data().subcomments?.length;
    });
    return len;
  };

  const handleOpenLikes = () => {
    setPostLikes(likes);
    setOpenLikes(true);
  };
  const handleOpenComments = () => {
    setPostComments(comments);
    setCurPost(post);
    setOpenComments(true);
  };
  const unsub = () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };

  const handlePlay = async () => {
    await updateDoc(doc(db, "posts", post.id), {
      views: videoViews ? videoViews + 1 : 1,
    });
  };

  return (
    <div>
      {router.asPath === "/" || view ? (
        <div className="bg-white border rounded-lg mb-2 mt-1 shadow-sm dark:shadow-gray-600 dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center py-2 px-[5px] shadow-md bg-white dark:bg-gray-900 dark:text-white">
            <div className="flex flex-1 items-center">
              <div className="relative rounded-full h-9 w-9 mx-2">
                <Image
                  loading="eager"
                  layout="fill"
                  className="rounded-full"
                  src={
                    user
                      ? user.profImg
                        ? user.profImg
                        : user.image
                      : require("../public/userimg.jpg")
                  }
                  alt="img"
                />
                <span
                  className={`-top-1 right-0 absolute  w-3.5 h-3.5 ${
                    user && user?.active ? "bg-green-400" : "bg-slate-400"
                  } border-[3px] border-white dark:border-gray-900 rounded-full`}
                ></span>
              </div>
              <button
                onClick={() => router.push(`/profile/${post.data().username}`)}
                className="font-bold dark:text-gray-200 cursor-pointer w-auto"
              >
                {user
                  ? user.fullname
                    ? user.fullname
                    : user.username
                  : post.data().username}
              </button>
              {user?.username === "hurairayounas" && (
                <div className="relative h-4 w-4">
                  <Image
                    src={require("../public/verified.png")}
                    layout="fill"
                    loading="eager"
                    alt="profile"
                    className="rounded-full"
                  />
                </div>
              )}
            </div>
            <Moment fromNow className="mr-2 text-[10px]">
              {post.data().timeStamp?.toDate()}
            </Moment>
            {visitor?.username === post.data().username ? (
              <div className="relative rounded-full h-6 w-6 bg-white mr-2">
                <XCircleIcon
                  className="absolute -top-[4px] -left-1 w-8 h-8 mr-3 opacity-80 cursor-pointer text-red-600"
                  onClick={() => deletePost(post.id)}
                />
              </div>
            ) : (
              <DotsHorizontalIcon className="btn pr-3 dark:text-gray-200" />
            )}
          </div>
          <div
            className={`${
              post.data().image ? "relative w-full h-[400px] md:h-[500px]" : ""
            } dark:bg-black bg-blue-200`}
          >
            {post.data().image && (
              <Image
                loading="eager"
                layout="fill"
                objectFit="contain"
                src={post.data().image}
                alt="cover"
              />
            )}
            {post.data().video && (
              <video
                playsInline
                controls
                preload="none"
                poster="https://domainjava.com/wp-content/uploads/2022/07/Link-Bokeh-Full-111.90-l50-204-Chrome-Video-Bokeh-Museum-2022.jpg"
                className="w-full h-auto max-h-[500px] overflow-hidden"
              >
                <source src={post.data().video} />
              </video>
            )}
          </div>

          <div className="flex justify-between px-3 py-2 bg-blue-500 dark:bg-gray-900 text-white items-center">
            <div className="flex space-x-3 items-center">
              {hasLike ? (
                <HeartIconFilled
                  onClick={likePost}
                  className="btn text-red-500"
                />
              ) : (
                <HeartIcon onClick={likePost} className="btn" />
              )}
              <ChatAlt2Icon className="btn" onClick={handleOpenComments} />
              <PaperAirplaneIcon className="btn pt-1 rotate-90" />
            </div>
            <BookmarkIcon className="btn" />
          </div>
          <div className="px-4 dark:text-gray-200 mb-2">
            <p className="flex space-x-2 font-semibold">
              {likes?.length > 0 && (
                <button onClick={handleOpenLikes} className="mb-1 flex">
                  {likes.length} {likes.length === 1 ? "like" : "likes"}
                </button>
              )}
              {post.data().views && (
                <span>
                  {post.data().views > 1
                    ? `${post.data().views} views`
                    : "1 view"}
                </span>
              )}
            </p>
            <button
              onClick={() => router.push(`/profile/${post.data().username}`)}
              className="font-bold relative mr-1"
            >
              {user?.fullname ? user.fullname : post?.data().username}
            </button>
            <span className="text-sm">{post.data().caption}</span>
          </div>

          {comments.length > 0 && (
            <button
              onClick={handleOpenComments}
              className="px-4 text-sm text-gray-400"
            >
              view {getLength(comments)}
              {comments.length === 1 ? " comment" : " comments"}
            </button>
          )}

          <form className="flex items-center py-1 px-4">
            <EmojiHappyIcon className="h-7 dark:text-gray-200" />
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-none flex-1 outline-none focus:ring-0 dark:bg-transparent dark:placeholder:text-gray-400 dark:text-white"
              placeholder="add a comment..."
              type="text"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              onClick={postComment}
              className="font-semibold text-blue-500 disabled:text-gray-400"
            >
              Post
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-blue-200 dark:bg-black rounded-md m-[1.5px]">
          <button
            onClick={() => setView(true)}
            className="relative h-[120px] w-[120px] sm:w-36 sm:h-36 rounded-md"
          >
            {post.data().image && (
              <Image
                src={post.data().image}
                layout="fill"
                objectFit="cover"
                loading="eager"
                alt="image"
                className="rounded-md"
              />
            )}
            {post.data().video && (
              <>
                <VideoCameraIcon className="h-5 w-5 absolute text-slate-200 m-1" />
                <video
                  preload="none"
                  src={post.data().video}
                  className="h-full w-full overflow-hidden"
                ></video>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
