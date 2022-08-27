import { ArrowLeftIcon, CameraIcon, MicrophoneIcon, PhotographIcon, XCircleIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import Loading from '../../components/Loading';
import getOtherEmail from '../../utils/getOtherEmail';
import getOtherProfImage from '../../utils/getOtherProfImage';
import getOtherTimeStamp from '../../utils/getOtherTimeStamp';

const Chat = () => {
    const { data: session } = useSession();
    const [text, setText] = useState("");
    const router = useRouter();
    const { id } = router.query;
    const messagesEndRef = useRef(null);
    const [messages, loading] = useCollectionData(query(collection(db, `chats/${id}/messages`), orderBy("timeStamp", "asc")));
    const [chat, chatLoading] = useDocumentData(doc(db, `chats/${id}`));

    const sendMessage = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'chats', id, 'messages'), {
            text: text,
            username: session.user.username,
            userImg: session.user.image,
            timeStamp: serverTimestamp(),
        })
        setText("");
    }
    const scrollToBottom = () => {
        messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" })
    }

    // const deleteMessage = async (id) => {
    //     console.log(id);
    //     console.log(messages);
    //     console.log(chat);
    // }

    useEffect(scrollToBottom, [messages]);
    if (chatLoading && loading) return <Loading />
    return (
        <div className="max-w-6xl lg:mx-auto flex justify-center bg-gray-100">
            <div className="bg-[url('https://i.pinimg.com/originals/b7/fc/af/b7fcaf2631fc54f28ef3f123855d03dc.jpg')] bg-no-repeat bg-cover bg-center w-full flex flex-col md:w-[700px] h-screen overflow-y-scroll scrollbar-hide scri">

                {/* Chat Header */}
                <section className="shadow-md bg-white sticky top-0 z-50">
                    <div className="flex items-center px-2 py-1">
                        <ArrowLeftIcon onClick={() => router?.back()} className="btn ml-1" />
                        <div className="flex items-center justify-center p-[1px] rounded-full border-red-500 border-2 object-contain mx-2">
                            <div className="relative w-8 h-8">
                                <Image
                                    loading='eager'
                                    layout="fill"
                                    src={getOtherProfImage(chat, session.user.username)}
                                    alt='prof'
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                        <div>
                            <h1 className="font-bold h-[20px]">{getOtherEmail(chat, session?.user)}</h1>
                            <span className="text-xs md:text-sm text-gray-400">active </span>
                            <Moment fromNow className="text-xs md:text-sm text-gray-400">
                                {getOtherTimeStamp(chat, session?.user.username)?.toDate()}
                            </Moment>
                        </div>
                    </div>
                </section>

                {/* Chat Body */}
                <section className='flex-1'>
                    {messages?.map((msg) => (
                        <div ref={messagesEndRef} key={msg.id} className={`flex mt-1 ${msg?.username === session?.user.username ? "justify-end" : ""}`}>
                            <div className="flex items-center rounded-md w-fit max-w-xs py-1 px-2 relative">
                                <div className={`absolute top-1 rounded-full ${msg?.username === session?.user.username ? "right-2" : ""}`}>
                                    <div className="flex items-center justify-center object-contain">
                                        <div className="relative w-7 h-7">
                                            <Image
                                                loading='eager'
                                                layout="fill"
                                                src={msg?.userImg}
                                                alt='prof'
                                                className='rounded-full'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <p className={`${msg?.username === session?.user.username ? "mr-9 bg-green-200" : "ml-9 bg-blue-200"} p-2 rounded-lg`}>{msg?.text}
                                    <Moment fromNow className="ml-2 text-[10px] text-gray-500">
                                        {msg?.timeStamp?.toDate()}
                                    </Moment>
                                </p>
                                {msg?.username === session?.user.username &&
                                    <XCircleIcon className="btn h-6 w-6 absolute -left-6 text-emerald-700 overflow-hidden" />
                                }
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
            </div >
        </div >
    )
}

export default Chat;