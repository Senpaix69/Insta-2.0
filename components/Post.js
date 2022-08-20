import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled }
    from '@heroicons/react/solid';

const Post = ({ id, username, userImg, img, caption }) => {
    return (
        <div className='bg-white border rounded-sm my-7'>
            <div className='flex items-center p-5'>
                <img className='rounded-full h-12 w-12 object-contain border p-1 mr-3'
                    src={userImg} alt='' />
                <p className='flex-1 font-bold'> {username} </p>
                <DotsHorizontalIcon className='h-5' />
            </div>

            <img className='w-full h-[500px]'
                src={img} alt='cover' />

            <div className='flex justify-between px-4 pt-4'>
                <div className='flex space-x-4'>
                    <HeartIcon className='btn' />
                    <ChatIcon className='btn' />
                    <PaperAirplaneIcon className='btn rotate-90' />
                </div>
                <BookmarkIcon className='btn' />
            </div>

            <p className='p-5 truncate'>
                <span className='font-bold mr-1'>{username} </span>{caption}
            </p>

            {/* comments */}
            {/* To DO */}


            <form className='flex items-center p-4'>
                <EmojiHappyIcon className='h-7' />
                <input className='border-none flex-1 outline-none focus:ring-0' placeholder='add a comment...' type='text' />
                <button className='font-semibold text-blue-500'>Post</button>
            </form>
        </div>
    )
}

export default Post;