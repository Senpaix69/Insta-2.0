import Image from 'next/image';
import Moment from 'react-moment';
import { XCircleIcon } from '@heroicons/react/solid';

const ChatList = ({ redirect, profImg, username, lastScene, id }) => {
    return (
        <div className='relative hover:bg-gray-200'>
            <button className='absolute flex items-center right-5 hover:underline cursor-pointer text-gray-500 text-sm font-semibold mt-3'>
                <XCircleIcon className='h-4 w-4 mr-1' />
                delete
            </button>
            <div onClick={() => redirect(id)} className='flex items-center w-full py-2 px-3 cursor-pointer truncate'>
                <div className="flex items-center justify-center p-[1px] rounded-full border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out">
                    <div className="relative w-11 h-11">
                        <Image
                            loading='eager'
                            layout="fill"
                            src={profImg}
                            alt='story'
                            className="rounded-full"
                        />
                    </div>
                </div>
                <div className='ml-3 w-full truncate'>
                    <h1 className='font-semibold -mt-1 h-[22px]'>{username}</h1>
                    <div className='flex text-sm w-full justify-between items-center pr-2'>
                        <span className='text-gray-400'>
                            dummy text
                        </span>
                        <Moment fromNow className='text-[9px] text-gray-400'>
                            {lastScene.toDate()}
                        </Moment>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatList;