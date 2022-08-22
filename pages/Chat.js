import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react'
import Header from '../components/Header';
import Loading from '../components/Loading';

const Chat = () => {
    const { data: session } = useSession();
    const router = useRouter();
    if(!session) {
        console.log("Logout")
        setTimeout(() => {
            router.push('/');
        }, 1000);
        return <Loading />
    }

    return (
        <div>
            {session && (
                <div>
                    <Header />
                    <div className='bg-gray-500 flex items-center justify-center h-screen'>
                        <button className='m-56 font-bold text-white hover:text-black'>
                            Chat section is in Production build</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Chat;