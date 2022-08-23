import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react'
import Header from '../components/Header';
import Moment from 'react-moment';
import { faker } from '@faker-js/faker';
import Login from './login';
import Chat from '../components/Chat';

const Chats = () => {
    const { data: session } = useSession();
    const [chats, setChats] = useState([]);
    const [activeChatID, setActiveChatID] = useState(-1);
    const [activeChat, setActiveChat] = useState({});

    useEffect(() => {
        const suggestions = [...Array(25)].map((_, i) => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            userImg: faker.image.avatar(),
            lastText: faker.lorem.words(4),
            timeStamp: 1,
            id: i,
        }))
        setChats(suggestions);
    }, [])

    const handleChat = (chatID) => {
        setActiveChatID(chatID);
    }

    useEffect(() => {
        setActiveChat(chats[activeChatID]);
    }, [activeChatID]);

    return (
        <>
            {activeChatID !== -1 ? (
                <>
                    <Chat
                        username={activeChat?.username}
                        userImg={activeChat?.userImg}
                        id={activeChat?.id}
                        setActiveChatID={setActiveChatID} />
                </>
            ) : (
                <div className='h-screen overflow-y-scroll scrollbar-hide'>
                    {session ? (
                        <div className='flex flex-col justify-between max-w-6xl md:mx-5 lg:mx-auto'>
                            <Header />
                            <div className='bg-gray-100 flex justify-center h-full'>
                                <div className='flex flex-col shadow-md md:w-[700px] w-full bg-white'>
                                    <div className='w-full flex text-lg justify-center items-center p-3 mb-2 shadow-md'>
                                        <h1 className='font-bold'>{session.user.username}</h1>
                                    </div>
                                    <p className='font-bold ml-5 mb-2'>Messages</p>
                                    <div>
                                        {chats?.map(chat => (
                                            <div key={chat.id} onClick={() => handleChat(chat.id)} className='flex items-center w-full py-2 px-3 cursor-pointer truncate'>
                                                <img className='w-12 h-12 rounded-full border p-0.5' alt='chat' src={chat.userImg} />
                                                <div className='ml-3 w-full truncate'>
                                                    <h1 className='font-semibold'>{chat.username}</h1>
                                                    <div className='flex text-sm w-full justify-between items-center pr-2'>
                                                        <span className=''>
                                                            {chat.lastText}
                                                        </span>
                                                        <Moment fromNow className='text-[9px] text-gray-400'>
                                                            <span>{chat.timeStamp}</span>
                                                        </Moment>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : <Login />}
                </div>
            )}
        </>
    )
}

export default Chats;