import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { themeState } from '../atoms/theme';
import Loading from '../components/Loading';
import Header from "../components/Header";
import Posts from "../components/Posts";
import ProfileSec from "../components/ProfileSec";
import { postView } from "../atoms/postView";
import { useEffect, useState } from "react";

const Profile = () => {
    const { data: session } = useSession();
    const [darkMode, setDarkMode] = useRecoilState(themeState);
    const [view, setView] = useRecoilState(postView);
    const [totalPosts, setTotalPosts] = useState(0);

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(darkMode));
    }, [darkMode])


    if (!session) return <Loading />
    return (
        <div className={`relative ${darkMode ? "bg-gray-50 " : "dark bg-gray-900"} h-screen overflow-y-scroll scrollbar-hide flex justify-center`}>
            <div className="max-w-6xl min-w-[380px] dark:text-gray-200 flex-1 overflow-x-scroll scrollbar-hide">
                {!view &&
                    <>
                        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                        <ProfileSec image={session.user.image} username={session.user.username} posts={totalPosts} />
                    </>}
                <Posts setTotalPosts={setTotalPosts} />
                <button disabled={!view} onClick={() => setView(false)} className={`w-full md:max-w-6xl bg-gray-500 py-2 font-bold uppercase absolute bottom-0 z-50 transition duration-200 ${view ? "translate-y-0 dark:text-green-800 dark:bg-green-300" : "translate-y-10 dark:text-gray-900 dark:bg-gray-900"}`}>close view</button>
            </div>
        </div>
    )
}

export default Profile;
