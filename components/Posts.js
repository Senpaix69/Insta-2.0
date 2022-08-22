import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useSession } from 'next-auth/react';
import Post from "./Post";

const Posts = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(
        () =>
            onSnapshot(query(collection(db, "posts"), orderBy('timeStamp', 'desc')),
                (snapshot) => {
                    setPosts(snapshot.docs);
                }
            ),
        [db]
    );

    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    session={session}
                    username={post.data().username}
                    userImg={post.data().profImg}
                    img={post.data().image}
                    caption={post.data().caption}
                    timeStamp={post.data().timeStamp}
                />
            ))}
        </div>
    )
}

export default Posts;