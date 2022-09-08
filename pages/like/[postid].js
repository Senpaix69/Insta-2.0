import Loading from "../../components/Loading";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";;
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { themeState } from "../../atoms/theme";
import Image from "next/image";
import Moment from "react-moment";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";
import { collection } from "firebase/firestore";
const LikeList = () => {
    const router = useRouter();
    const { postid } = router.query;
    const [likes, loading] = useCollectionData(collection(db, `posts/${postid}/likes`));
    const [darkTheme] = useRecoilState(themeState);

    return (
        <div className={`${!darkTheme ? "dark bg-gray-900" : ""} h-screen overflow-y-scroll scrollbar-hide`}>
            <div className="px-3 py-2 w-full md:max-w-3xl m-auto dark:text-gray-200">
                <ArrowLeftIcon className="h-6 w-6 cursor-pointer" onClick={() => router.back()} />
                <div className="mt-5 w-full flex">
                    <div className="flex items-center space-x-3 m-auto h-9 bg-slate-100 dark:bg-gray-700 rounded-lg p-3 w-full text-sm md:w-[60%]">
                        <SearchIcon className="h-4 w-4" />
                        <input className="bg-transparent outline-none focus:ring-0" placeholder="Search" />
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <h1 className="font-semibold">LIKED BY</h1>
                    <p className="text-gray-400 text-sm">{likes?.length} Likes</p>
                </div>
                <div className="border-b-2 border-gray-500"></div>
                {loading ? <Loading /> :
                    <div>
                        {likes?.map((like, i) => (
                            <div key={i} className="w-full flex justify-between items-center">
                                <div className="relative h-16 flex items-center w-full">
                                    {like.userImg && <Image
                                        alt="image"
                                        src={like.userImg}
                                        height='40px'
                                        width='40px'
                                        className="rounded-full"
                                    />}
                                    <div className="ml-3">
                                        <h1 className="font-bold mt-1">{like.username}</h1>
                                        {like.timeStamp &&
                                            <Moment className="text-gray-400 text-xs align-text-top" fromNow>{like.timeStamp.toDate()}</Moment>}
                                    </div>
                                </div>
                                <button className="bg-blue-500 py-1 px-6 text-sm font-semibold rounded-md text-white">Follow</button>
                            </div>
                        ))}
                    </div>}
            </div>
        </div>
    )
}

export default LikeList;