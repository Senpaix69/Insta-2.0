import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebase";
import Post from "./Post";
import Loading from "./Loading";
import { useRouter } from "next/router";
import { postView } from "../atoms/postView";
import { useRecoilState } from "recoil";

const Posts = ({
  setTotalPosts,
  profile,
  setLoad,
  showFollowers,
  showFollowings,
}) => {
  const [posts, setPosts] = useState(undefined);
  const router = useRouter();
  const [view] = useRecoilState(postView);
  const toastId = useRef(null);

  useEffect(() => {
    if (posts) {
      setLoad(true);
    }
  }, [posts]);

  useEffect(() => {
    if (router.pathname === "/") {
      onSnapshot(
        query(collection(db, "posts"), orderBy("timeStamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      );
    }
  }, [router.pathname]);

  useEffect(() => {
    if (router.pathname !== "/") {
      getDocs(
        query(
          collection(db, "posts"),
          where("username", "==", profile),
          orderBy("timeStamp", "desc")
        )
      ).then((snapshot) => {
        setPosts(snapshot?.docs);
        setTotalPosts(snapshot.docs?.length);
      });
    }
  }, [profile, router.pathname]);

  const deletePost = async (id) => {
    if (confirm("Do you really want to delete this post?")) {
      toastId.current = toast.loading("deleting...", {
        position: "top-center",
      });
      setPosts(posts?.filter((post) => post.id !== id));
      await deleteDoc(doc(db, "posts", id)).then(() => {
        toast.dismiss(toastId.current);
        toastId.current = null;
        toast.success("Post Deleted Successfully 👍", {
          position: "top-center",
        });
      });
    }
  };

  return (
    <div
      className={`relative mb-14 ${
        showFollowers || showFollowings ? "hidden" : ""
      } ${
        router.asPath !== "/" && !view
          ? `grid ${
              posts?.length ? "grid-cols-3" : "grid-cols-1"
            } place-items-center md:flex md:flex-wrap p-3 justify-left`
          : ""
      }`}
    >
      {posts === undefined ? (
        <Loading />
      ) : (
        posts?.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.data().username}
            userImg={post.data().profImg}
            img={post.data().image}
            video={post.data().video}
            videoViews={post.data().views}
            caption={post.data().caption}
            timeStamp={post.data().timeStamp}
            router={router}
            deletePost={deletePost}
          />
        ))
      )}
      {posts?.length === 0 && (
        <h1 className="absolute font-bold left-[41%] top-[200px] text-gray-400">
          No posts yet 🙁
        </h1>
      )}
      <ToastContainer autoClose={2500} theme="dark" pauseOnFocusLoss={false} />
    </div>
  );
};

export default Posts;
