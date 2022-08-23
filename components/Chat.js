import { ArrowLeftIcon } from "@heroicons/react/outline";
import Moment from "react-moment";

const Chat = ({ username, userImg, timeStamp, setActiveChatID }) => {
    return (
        <div className="max-w-6xl lg:mx-auto bg-[url('https://i.pinimg.com/originals/b7/fc/af/b7fcaf2631fc54f28ef3f123855d03dc.jpg')] bg-no-repeat bg-contain bg-center w-full h-screen">

            {/* Chat Header */}
            <section className="shadow-lg border-b bg-transparent sticky top-0 z-50">
                <div className="flex items-center p-2">
                    <ArrowLeftIcon onClick={() => setActiveChatID(-1)} className="btn ml-1" />
                    <img
                        src={userImg}
                        alt='Hello'
                        className="h-11 w-11 cursor-pointer rounded-full border p-[1.5px] mx-3"
                    />
                    <div>
                        <h1 className="font-bold text-lg h-[24px]">{username}</h1>
                        <Moment fromNow className="ml-1 text-sm text-gray-400">
                            <p>{timeStamp}</p>
                        </Moment>
                    </div>
                </div>
            </section>

            {/* Chat Body */}


            {/* Chat Bottom */}
        </div>
    )
}

export default Chat;