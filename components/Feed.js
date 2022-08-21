import Image from "next/image";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useSession, signIn } from 'next-auth/react';

const Feed = () => {
  const { data: session } = useSession();

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
      {session ? (
        <>
          <section className="col-span-2">
            <Stories />
            <Posts />
          </section>

          <section className="hidden xl:inline-grid md:col-span-1">
            <div className="fixed top-20">
              <MiniProfile />
              <Suggestions />
            </div>
          </section>
        </>
      ) : (
        <div className="flex flex-col m-auto col-span-3 items-center mt-20 shadow-lg border rounded-lg w-full md:w-1/2 h-full p-20">
          <div className="relative w-52 h-52">
            <Image
              onClick={() => router.push('/')}
              src='https://links.papareact.com/jjm'
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h6 className="px-2 py-1 text-sm font-bold italic mt-10 text-gray-600">Welcome To Insta-2.0</h6>
          <h1 onClick={signIn} className="p-2 bg-blue-400 shadow-lg px-2 border rounded-lg text-lg font-bold italic mt-2 text-white cursor-pointer hover:text-blue-500 hover:bg-gray-50">Please SignIn</h1>
        </div>
      )}
    </main >
  )
}

export default Feed;