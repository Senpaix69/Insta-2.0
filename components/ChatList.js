import Moment from 'react-moment';

const ChatList = ({ redirect, profImg, username, lastScene, id }) => {
    return (
        <div onClick={() => redirect(id)} className='flex items-center w-full py-2 px-3 cursor-pointer truncate'>
            <img className='w-12 h-12 rounded-full border p-0.5' alt='chat' src={profImg} />
            <div className='ml-3 w-full truncate'>
                <h1 className='font-semibold h-[22px]'>{username}</h1>
                <div className='flex text-sm w-full justify-between items-center pr-2'>
                    <span className='text-gray-400'>
                        dummy text
                    </span>
                    <Moment fromNow className='text-[9px] text-gray-400'>
                        {lastScene}
                    </Moment>
                </div>
            </div>
        </div>
    )
}

export default ChatList;