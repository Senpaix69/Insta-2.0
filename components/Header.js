import Image from "next/image";
import {
    SearchIcon, PlusCircleIcon,
    UserGroupIcon, HeartIcon,
    PaperAirplaneIcon, MenuIcon,
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from 'recoil';
import { modelState } from "../atoms/modelAtom";


const Header = () => {
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modelState);
    const router = useRouter();
    return (
        <div className="shadow-sm border-b bg-white sticky top-0 z-50">
            <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
                {/* Header */}
                <div className="relative hidden lg:inline-grid w-24 cursor-pointer">
                    <Image
                        onClick={() => router.push('/')}
                        src='https://links.papareact.com/ocw'
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
                    <Image
                        onClick={() => router.push('/')}
                        src='https://links.papareact.com/jjm'
                        layout="fill"
                        objectFit="contain"
                    />
                </div>

                {/* Search */}
                <div className="max-w-xs">
                    <div className="mt-1 relative p-3 rounded-md">
                        <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className='h-5 w-5 text-gray-500' />
                        </div>
                        <input className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray focus:ring-black focus:border-black rounded-md" placeholder="search.." type='text' />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4 justify-end">
                    <HomeIcon onClick={() => router.push('/')} className="navBtn" />
                    <MenuIcon className="h-6 md:hidden cursor-pointer" />
                    {session ? (
                        <>
                            <div className="relative navBtn">
                                <PaperAirplaneIcon className="navBtn rotate-45" />
                                <div className="absolute -top-2 -right-2 text-xs w-5 h-5 bg-red-500 flex items-center justify-center rounded-full animate-pulse text-white">3</div>
                            </div>
                            <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn" />
                            <UserGroupIcon className="navBtn" />
                            <HeartIcon className="navBtn" />
                            <img onClick={signOut} src={session.user?.image} alt='Profile Pic' className="h-10 w-10 rounded-full cursor-pointer" />
                        </>
                    ) : (
                        <button onClick={signIn} className='font-semibold hover:text-blue-500 transition duration-300'>signIn</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;