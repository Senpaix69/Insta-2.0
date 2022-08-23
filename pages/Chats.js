import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Header from '../components/Header';
import Loading from '../components/Loading';
import Moment from 'react-moment';


const Chat = () => {
    const { data: session } = useSession();
    const router = useRouter();
    if (!session) {
        console.log("Logout")
        setTimeout(() => {
            router.push('/');
        }, 1000);
        return <Loading />
    }


    const chats = [
        {
            id: "123",
            username: session.user.username,
            userImg: session.user.image,
            lastText: "Hi Im the last text 1",
            timeStamp: 1
        },
        {
            id: "12",
            username: session.user.username,
            userImg: session.user.image,
            lastText: "Hi Im the last text 2",
            timeStamp: 1
        },
        {
            id: "11",
            username: session.user.username,
            userImg: session.user.image,
            lastText: "Hi Im the last text 3 in this world how you doing texting random person whom you find truth with a single person",
            timeStamp: 1
        },
        {
            id: "11",
            username: session.user.username,
            userImg: session.user.image,
            lastText: "Hi Im the last text 4",
            timeStamp: 1
        },
    ]

    return (
        <div className='h-screen overflow-y-scroll scrollbar-hide'>
            {session && (
                <div className='flex flex-col justify-between max-w-6xl md:mx-5 lg:mx-auto'>
                    <Header />
                    <div className='bg-gray-100 flex justify-center h-screen'>
                        <div className='flex flex-col shadow-md md:w-[700px] w-full bg-white'>
                            <div className='w-full flex justify-center items-center p-4 mb-2 shadow-md'>
                                <h1 className='font-bold'>{session.user.username}</h1>
                            </div>
                            <p className='font-bold ml-5'>Messages</p>
                            <div>
                                {chats.map(chat => (
                                    <div className='flex items-center w-full py-1 px-3 mt-1 cursor-pointer truncate'>
                                        <img className='w-12 h-12 rounded-full' src={chat.userImg} />
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
            )}
        </div>
    )
}

export default Chat;