import { ArrowLeftIcon, CameraIcon, MicrophoneIcon, PhotographIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import { useState, useEffect, useRef } from "react";
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';

const Chat = ({ username, userImg, setActiveChatID }) => {

    const { data: session } = useSession();
    const [msgs, setMsgs] = useState([]);
    const [text, setText] = useState('');
    const [user, setUser] = useState({});
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [msgs]);

    useEffect(
        () =>
            onSnapshot(query(collection(db, "chats", session?.user.uid, "username", username, "messages"), orderBy("timeStamp", 'asc')), (snapshot) => {
                const texts = [];
                snapshot.forEach((doc) => {
                    texts.push(doc.data())
                })
                setMsgs(texts);
            }),
        []);

    useEffect(
        () =>
            onSnapshot(doc(db, "users", username), (snapshot) => {
                setUser(snapshot.data());
            }),
        []);



    const sendMessage = async (e) => {
        e.preventDefault();
        const msgToSend = text;
        setText('');

        await addDoc(collection(db, "chats", session.user.uid, "username", username, "messages"), {
            text: msgToSend,
            username: session.user.username,
            userImg: session.user.image,
            timeStamp: serverTimestamp(),
        })
    }


    return (
        <div ref={messagesEndRef} className="max-w-6xl lg:mx-auto flex justify-center bg-gray-100">
            <div className="bg-[url('https://i.pinimg.com/originals/b7/fc/af/b7fcaf2631fc54f28ef3f123855d03dc.jpg')] bg-no-repeat bg-cover bg-center w-full flex flex-col md:w-[700px] h-screen overflow-y-scroll scrollbar-hide scri">

                {/* Chat Header */}
                <section className="shadow-md bg-white sticky top-0 z-50">
                    <div className="flex items-center px-2 py-1">
                        <ArrowLeftIcon onClick={() => setActiveChatID(-1)} className="btn ml-1" />
                        <img
                            src={userImg}
                            alt='Hello'
                            className="h-10 w-10 cursor-pointer rounded-full border p-[1.5px] mx-3"
                        />
                        <div>
                            <h1 className="font-bold h-[20px]">{username}</h1>
                            <span className="text-xs md:text-sm text-gray-400">active </span>
                            <Moment fromNow className="text-xs md:text-sm text-gray-400">
                                {user?.timeStamp?.toDate()}
                            </Moment>
                        </div>
                    </div>
                </section>

                {/* Chat Body */}
                <section className='flex-1'>
                    {msgs?.map((msg, i) => (
                        <div ref={messagesEndRef} key={i} className={`flex mt-1 ${msg.username === session?.user.username ? "justify-end" : ""}`}>
                            <div className="flex items-center rounded-md w-fit max-w-xs py-1 px-2 relative">
                                <img src={msg.userImg} alt='Profile' className={`h-8 w-8 rounded-full cursor-pointer absolute top-1 ${msg.username === session?.user.username ? "right-2" : ""}`} />
                                <p className={`${msg.username === session?.user.username ? "mr-9" : "ml-9"} bg-gray-300 p-2 rounded-lg`}>{msg.text}
                                    <Moment fromNow className="ml-2 text-[10px] text-gray-500">
                                        {msg.timeStamp?.toDate()}
                                    </Moment>
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Chat Bottom */}
                <section className="bg-gray-50 sticky bottom-0 z-50 shadow-sm mx-1">
                    <form>
                        <div className="w-full border rounded-3xl h-12 flex items-center">
                            <CameraIcon className="h-7 w-7 cursor-pointer text-gray-500 ml-2" />
                            <input
                                placeholder="Message.."
                                className="mx-2 flex-1 outline-none text-md focus:ring-0 bg-transparent"
                                value={text}
                                name={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <MicrophoneIcon className="h-7 w-7 cursor-pointer text-gray-500" />
                            <PhotographIcon className="mx-2 h-7 w-7 cursor-pointer text-gray-500" />
                            <button
                                type="submit"
                                onClick={sendMessage}
                                disabled={text ? false : true}
                                className="mr-3 font-semibold text-sm text-blue-500 disabled:text-gray-400">
                                send
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default Chat;