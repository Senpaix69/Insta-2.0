import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react'
import Header from '../components/Header';
import Moment from 'react-moment';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Chat from '../components/Chat';
import Loading from '../components/Loading';

const Chats = () => {
    const { data: session } = useSession();
    const [chats, setChats] = useState([]);
    const [activeChatID, setActiveChatID] = useState(-1);
    const [activeChat, setActiveChat] = useState({});

    useEffect(() => {
        const getChats = async () => {
            const data = await getDocs(collection(db, "chats", session?.user.uid, "username"));
            const arr = [];
            data.forEach((doc) => {
                arr.push(doc.data())
            })
            setChats(arr);
        };
        if (session) getChats();
    }, [session])

    useEffect(() => {
        setActiveChat(chats[activeChatID]);
    }, [activeChatID, chats]);

    if (!session) return <Loading />
    return (
        <>
            {activeChatID !== -1 && activeChat ? (
                <Chat
                    username={activeChat.username}
                    userImg={activeChat.userImage}
                    setActiveChatID={setActiveChatID} />
            ) : (
                <div className='h-screen overflow-y-scroll scrollbar-hide'>
                    <div className='flex flex-col justify-between max-w-6xl md:mx-5 lg:mx-auto'>
                        <Header />
                        <div className='bg-gray-100 flex justify-center h-screen'>
                            <div className='flex flex-col shadow-md md:w-[700px] w-full bg-white'>
                                <div className='w-full flex text-lg justify-center items-center p-3 mb-2 shadow-md'>
                                    <h1 className='font-bold'>{session.user.username}</h1>
                                </div>
                                <p className='font-bold ml-5 mb-2'>Messages</p>
                                <div>
                                    {chats?.map((chat, i) => (
                                        <div key={i} onClick={() => setActiveChatID(i)} className='flex items-center w-full py-2 px-3 cursor-pointer truncate'>
                                            <img className='w-12 h-12 rounded-full border p-0.5' alt='chat' src={chat.userImage} />
                                            <div className='ml-3 w-full truncate'>
                                                <h1 className='font-semibold h-[22px]'>{chat.username}</h1>
                                                <div className='flex text-sm w-full justify-between items-center pr-2'>
                                                    <span className='text-gray-400'>
                                                        Temporary
                                                    </span>
                                                    <Moment fromNow className='text-[9px] text-gray-400'>
                                                        <span>1</span>
                                                    </Moment>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </>
    )
}

export default Chats;