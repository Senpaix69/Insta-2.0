import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { HomeIcon, UserCircleIcon, PlusCircleIcon, ChatAlt2Icon, SparklesIcon, ArrowCircleLeftIcon, MoonIcon } from '@heroicons/react/solid';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Example({ session, setOpen, signOut, router }) {

    return (
        <Menu as="div" className="relative inline-block text-left md:hidden pt-2">
            <Menu.Button>
                <img src={session?.user?.image} alt='Profile Pic' className="h-10 w-10 rounded-full cursor-pointer btn" />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-3">
                        {router.asPath !== '/' &&
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => router.push('/')}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-3 text-sm w-full'
                                        )}
                                    >
                                        <div className='flex'>
                                            <HomeIcon className='h-5 w-5 mr-2' />
                                            Home
                                        </div>
                                    </button>
                                )}
                            </Menu.Item>}
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-3 text-sm w-full'
                                    )}
                                >
                                    <div className='flex'>
                                        <UserCircleIcon className='h-5 w-5 mr-2' />
                                        Profile [Not Active]
                                    </div>
                                </button>
                            )}
                        </Menu.Item>
                        {router.asPath !== '/Chats' &&
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => setOpen(true)}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-3 text-sm w-full'
                                        )}
                                    >
                                        <div className='flex'>
                                            <PlusCircleIcon className='h-5 w-5 mr-2' />
                                            Add Post
                                        </div>
                                    </button>
                                )}
                            </Menu.Item>}
                        {router.asPath !== '/Chats' &&
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => router.push('/Chats')}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-3 text-sm w-full'
                                        )}
                                    >
                                        <div className='flex'>
                                            <ChatAlt2Icon className='h-5 w-5 mr-2' />
                                            Chats
                                        </div>
                                    </button>
                                )}
                            </Menu.Item>}
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-3 text-sm w-full'
                                    )}
                                >
                                    <div className='flex'>
                                        <SparklesIcon className='h-5 w-5 mr-2' />
                                        Support [Not Active]
                                    </div>
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={signOut}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full px-4 py-3 text-sm'
                                    )}
                                >
                                    <div className='flex'>
                                        <MoonIcon className='h-5 w-5 mr-2' />
                                        Theme [Not Active]
                                    </div>
                                </button>
                            )}
                        </Menu.Item>
                        {router.asPath !== '/Chats' &&
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={signOut}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-3 text-sm'
                                        )}
                                    >
                                        <div className='flex'>
                                            <ArrowCircleLeftIcon className='h-5 w-5 mr-2' />
                                            Sign out
                                        </div>
                                    </button>
                                )}
                            </Menu.Item>}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}