import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(
        () =>
            onSnapshot(query(collection(db, "posts"), orderBy('timeStamp', 'desc')),
                (snapshot) => {
                    console.log(snapshot.docs);
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
                    username={post.data().username}
                    userImg={post.data().profImg}
                    img={post.data().image}
                    caption={post.data().caption}
                />
            ))}
        </div>
    )
}

export default Posts;