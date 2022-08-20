import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useSession } from 'next-auth/react';

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
      ) : (<h1 className="col-span-3 flex m-auto text-lg font-bold italic mt-20 text-gray-400">Please SignIn</h1>)}
    </main>
  )
}

export default Feed;