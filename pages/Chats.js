import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react'
import Header from '../components/Header';
import Moment from 'react-moment';
import { collection, getDocs, doc, updateDoc, serverTimestamp, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Chat from '../components/Chat';
import Loading from '../components/Loading';

export async function getServerSideProps() {

    const data = await getDocs(collection(db, "chats"));
    const arr = []
    data.forEach((doc) => {
        arr.push(doc.data())
    })
    return {
        props: {
            chatsData: arr
        },
    };
}

const Chats = ({ chatsData }) => {
    const { data: session } = useSession();
    const [chats, setChats] = useState([]);
    const [activeChatID, setActiveChatID] = useState(-1);
    const [activeChat, setActiveChat] = useState({});

    useEffect(() => {
        setChats(chatsData);
    }, [chatsData])

    useEffect(() => {
        const getUserData = async () => {
            const data = await getDocs(collection(db, "chats"));
            const arr = []
            data.forEach((doc) => {
                arr.push(doc.data())
            })
            setChats(arr);
        }
        if (session) getUserData();
    }, [session, chats])

    useEffect(() => {
        setActiveChat(chats[activeChatID]);
    }, [activeChatID, chats]);

    useEffect(() => {
        const addUser = async () => {
            await updateDoc(doc(db, "users", session?.user.username), {
                timeStamp: serverTimestamp()
            });
        };
        if (session) addUser();
    }, [session?.user.username]);

    const addChat = async () => {
        const uName = prompt("Enter the username: ")?.split(' ').join('').toLowerCase();
        if (uName === session.user.username) {
            alert("You can not add yourself");
        } else if (uName) {
            if (chats.findIndex((chat) => chat.username === uName) !== -1) {
                alert(`${uName} already added`);
            } else {
                const userCheck = await getDoc(doc(db, "users", uName));
                if (userCheck.exists()) {
                    await setDoc(doc(db, "chats", uName + "-" + session?.user.username), {
                        username: userCheck.data().username,
                        userImage: userCheck.data().profImg
                    })
                } else {
                    alert(`${uName} does not exits`);
                }
            }
        }
    }

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
                                <div className='flex items-center'>
                                    <p className='font-bold ml-5 mb-2 flex-1'>Messages</p>
                                    <button className='font-bold mr-5 text-sm text-blue-500'
                                        onClick={addChat}
                                    >Add Chat</button>
                                </div>
                                <div>
                                    {chats?.map((chat, i) => (
                                        <div key={i} onClick={() => setActiveChatID(i)} className='flex items-center w-full py-2 px-3 cursor-pointer truncate'>
                                            <img className='w-12 h-12 rounded-full border p-0.5' alt='chat' src={chat.userImage} />
                                            <div className='ml-3 w-full truncate'>
                                                <h1 className='font-semibold h-[22px]'>{chat.username}</h1>
                                                <div className='flex text-sm w-full justify-between items-center pr-2'>
                                                    <span className='text-gray-400'>
                                                        last text
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