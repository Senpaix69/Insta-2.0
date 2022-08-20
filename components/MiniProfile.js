import { signOut, useSession } from 'next-auth/react';

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img className="rounded-full w-16 h-16 border p-[2px]"
        src={session?.user?.image} alt="Profile Pic" />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome To My Instagram</h3>
      </div>
      <button className="text-blue-400 font-semibold text-sm" onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default MiniProfile;