import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { addDoc, doc, collection, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { db } from '../firebase';
import Moment from 'react-moment';

const Post = ({ id, username, userImg, img, caption }) => {
    const { data: session } = useSession();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLike, setHasLike] = useState(false);

    useEffect(
        () =>
            onSnapshot(collection(db, "posts", id, "likes"),
                (snapshot) => setLikes(snapshot.docs)
            ),
        [db, id])

    useEffect(
        () =>
            onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("timeStamp", 'desc')), (snapshot) => setComments(snapshot.docs)
            ),
        [db, id]
    );


    useEffect(() => setHasLike
        (likes.findIndex((like) => like.id === session?.user?.uid) !== -1),
        [likes]
    );

    const likePost = async () => {
        if (hasLike) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
        } else {
            await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.username,
            });
        }
    };

    const postComment = async (e) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session.user.username,
            userImg: session.user.image,
            timeStamp: serverTimestamp(),
        })
    }

    return (
        <div className='bg-white border rounded-sm my-2'>
            <div className='flex items-center py-1 px-3'>
                <img className='rounded-full h-12 w-12 object-contain border p-1 mr-3'
                    src={userImg} alt='' />
                <p className='flex-1 font-bold'> {username} </p>
                <DotsHorizontalIcon className='h-5' />
            </div>

            <img className='w-full max-h-[500px] object-scale-down'
                src={img} alt='cover' />

            <div className='flex justify-between px-4 pt-4'>
                <div className='flex space-x-4'>
                    {hasLike ? <HeartIconFilled onClick={likePost} className='btn text-red-500' />
                        : <HeartIcon onClick={likePost} className='btn' />}
                    <ChatIcon className='btn' />
                    <PaperAirplaneIcon className='btn rotate-90' />
                </div>
                <BookmarkIcon className='btn' />
            </div>

            <p className='px-5 py-2'>
                {likes.length > 0 && (
                    <p className='font-bold mb-1'>{likes.length} {likes.length === 1 ? "like" : "likes"}</p>
                )}
                <span className='font-bold mr-1'>{username} </span>{caption}
            </p>

            {/* comments */}
            {comments.length > 0 && (
                <div className='ml-5 h-20 overflow-y-scroll scrollbar-thumb-gray-300 scrollbar-thin'>
                    {comments.map((comment) => (
                        <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                            <img
                                className='h-7 rounded-full'
                                src={comment.data().userImg}
                                alt='userimg'
                            />
                            <p className='text-sm flex-1'>
                                <span className='font-bold'>{comment.data().username} </span>
                                {comment.data().comment}
                            </p>
                            <Moment fromNow className='pr-5 text-xs text-gray-400'>
                                {comment.data().timeStamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}


            <form className='flex items-center py-2 px-4'>
                <EmojiHappyIcon className='h-7' />
                <input value={comment} onChange={(e) => setComment(e.target.value)} className='border-none flex-1 outline-none focus:ring-0' placeholder='add a comment...' type='text' />
                <button type='submit' disabled={!comment.trim()} onClick={postComment} className='font-semibold text-blue-500 disabled:text-gray-400'>Post</button>
            </form>
        </div>
    )
}

export default Post;