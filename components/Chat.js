import { ArrowLeftIcon, CameraIcon, MicrophoneIcon, PhotographIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import { useState } from "react";
import { useSession } from 'next-auth/react';

const Chat = ({ username, userImg, timeStamp, id, setActiveChatID }) => {

    const { data: session } = useSession();
    const [msgs, setMsgs] = useState([
        {
            userImg: userImg,
            userid: 1,
            text: "This is example message 1, how are you doing bitches",
            timeStamp: 1
        },
        {
            userImg: session?.user.image,
            userid: session?.user.uid,
            text: "This is example message 2",
            timeStamp: 2
        },
    ]);
    const [text, setText] = useState('');

    return (
        <div className="max-w-6xl lg:mx-auto flex justify-center bg-gray-100">
            <div className="bg-[url('https://i.pinimg.com/originals/b7/fc/af/b7fcaf2631fc54f28ef3f123855d03dc.jpg')] bg-no-repeat bg-cover bg-center w-full flex flex-col md:w-[700px] h-screen overflow-y-scroll scrollbar-hide">

                {/* Chat Header */}
                <section className="shadow-sm bg-white sticky top-0 z-50">
                    <div className="flex items-center px-2 py-1">
                        <ArrowLeftIcon onClick={() => setActiveChatID(-1)} className="btn ml-1" />
                        <img
                            src={userImg}
                            alt='Hello'
                            className="h-10 w-10 cursor-pointer rounded-full border p-[1.5px] mx-3"
                        />
                        <div>
                            <h1 className="font-bold h-[20px]">{username}</h1>
                            <Moment fromNow className="text-xs md:text-sm text-gray-400">
                                <p>{timeStamp}</p>
                            </Moment>
                        </div>
                    </div>
                </section>

                {/* Chat Body */}
                <section className='flex-1'>
                    {msgs?.map((msg) => (
                        <div key={msg?.userid} className={`flex mt-1 ${msg.userid === session?.user.uid ? "justify-end" : ""}`}>
                            <div className="flex items-center rounded-md w-fit max-w-xs py-1 px-2 relative">
                                <img src={msg.userImg} alt='Profile' className={`h-8 w-8 rounded-full cursor-pointer absolute top-1 ${msg.userid === session?.user.uid ? "right-2" : ""}`} />
                                <p className={`${msg.userid === session?.user.uid ? "mr-9" : "ml-9"} bg-gray-300 p-2 rounded-lg`}>{msg.text}
                                    <Moment fromNow className="ml-2 text-[10px] text-gray-500">
                                        <span>{msg.timeStamp}</span>
                                    </Moment>
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Chat Bottom */}
                <section className="bg-gray-50 sticky bottom-0 z-50 shadow-sm mx-1">
                    <div className="w-full border rounded-3xl h-12 flex items-center">
                        <div className="ml-1 h-10 w-10 bg-blue-500 border flex items-center justify-center rounded-full">
                            <CameraIcon className="h-7 w-7 cursor-pointer text-white" />
                        </div>
                        <input
                            placeholder="Message.."
                            className="mx-2 flex-1 outline-none text-md focus:ring-0"
                            value={text}
                            name={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <MicrophoneIcon className="h-6 w-6 cursor-pointer text-blue-500" />
                        <PhotographIcon className="mx-2 h-6 w-6 cursor-pointer text-blue-500" />
                        <button
                            type="submit"
                            disabled={text ? false : true}
                            className="mr-3 font-semibold text-sm text-blue-500 disabled:text-gray-400">
                            send
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Chat;