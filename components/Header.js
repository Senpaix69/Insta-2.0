import Image from "next/image";
import {
    SearchIcon, PlusCircleIcon,
    UserGroupIcon, HeartIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from 'recoil';
import { modelState } from "../atoms/modelAtom";
import Menu from './Menu';


const Header = () => {
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modelState);
    const router = useRouter();
    return (
        <div className="shadow-sm border-b bg-white sticky top-0 py-2 z-50">
            {session && (
                <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
                    {/* Header */}
                    <div className="relative hidden lg:inline-grid w-24">
                        <Image
                            alt="img"
                            src='https://links.papareact.com/ocw'
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    <div className="relative w-10 lg:hidden flex-shrink-0">
                        <Image
                            alt="img"
                            src='https://links.papareact.com/jjm'
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>

                    {/* Search */}
                    <div className="max-w-xs">
                        <div className="mt-1 relative p-2 rounded-md">
                            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className='h-5 w-5 text-gray-500' />
                            </div>
                            <input className="bg-gray-50 md:block w-full pl-10 sm:text-sm border-gray-200 focus:ring-gray-200 focus:border-gray-200  rounded-md" placeholder="search.." type='text' />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4 justify-end">
                        <Menu setOpen={setOpen} signOut={signOut} session={session} router={router} />
                        <div className="md:flex hidden items-center space-x-4 justify-end">
                            <HomeIcon onClick={() => router.push('/')} className="navBtn" />
                            <div className="relative navBtn">
                                <PaperAirplaneIcon onClick={() => router.push('/Chats')} className="navBtn rotate-45" />
                                <div className="absolute -top-2 -right-2 text-xs w-5 h-5 bg-red-500 flex items-center justify-center rounded-full animate-pulse text-white">5</div>
                            </div>
                            <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn" />
                            <UserGroupIcon className="navBtn" />
                            <HeartIcon className="navBtn" />
                            <img onClick={signOut} src={session.user?.image} alt='Profile Pic' className="h-8 w-8 rounded-full cursor-pointer" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Header;