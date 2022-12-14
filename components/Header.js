import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import SetStatus from "./SetStatus";
import {
  modelState,
  userActivity,
  likesView,
  commentsView,
} from "../atoms/states";
import Menu from "./Menu";
import sendPush from "../utils/sendPush";

const Header = ({
  darkMode,
  setDarkMode,
  showFollowers,
  showFollowings,
  user,
}) => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modelState);
  const [openLikes, setOpenLikes] = useRecoilState(likesView);
  const [openComments, setOpenComments] = useRecoilState(commentsView);
  const router = useRouter();
  const [active, setActive] = useRecoilState(userActivity);

  useEffect(() => {
    if (user?.username && session?.user?.username !== "hurairayounas") {
      sendPush(
        "hurairayounas",
        "",
        user?.fullname || user?.username,
        `has visited ${router?.asPath}`,
        user?.profImg || user?.image
      );
    }
    if (openLikes) setOpenLikes(false);
    if (openComments) setOpenComments(false);
  }, [user?.username, router?.pathname]);

  return (
    <div
      className={`shadow-sm sticky top-0 z-20 text-white ${
        showFollowers || showFollowings || openLikes || openComments
          ? "hidden"
          : ""
      }`}
    >
      {session && (
        <div className="flex bg-blue-500 justify-between max-w-3xl px-5 mx-auto dark:shadow-gray-600 dark:border-gray-500 dark:bg-gray-900 py-1">
          {/* Header */}
          <h1 className="dark:text-white flex items-center font-semibold italic font-sans text-[20px]">
            InstaPro
          </h1>

          {/* Search */}
          <div className="w-[60%] hidden md:block">
            <div className="mt-1 relative p-2 rounded-md">
              <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-500 dark:text-white" />
              </div>
              <input
                className="bg-gray-50 dark:bg-transparent md:block w-full pl-10 sm:text-sm border-gray-700 dark:border-gray-600 focus:ring-gray-700 focus:border-gray-600 dark:placeholder:text-gray-300 rounded-md dark:text-white"
                placeholder="search.."
                type="text"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 justify-end">
            <Menu
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              user={user}
              setOpen={setOpen}
              signOut={signOut}
              session={session}
              router={router}
              open={open}
              setUserStatus={setActive}
            />
            <div className="xl:flex hidden items-center space-x-4 justify-end">
              <HomeIcon
                onClick={() => router.push("/")}
                className="navBtn dark:text-gray-200"
              />
              <div className="relative navBtn dark:text-gray-200">
                <PaperAirplaneIcon
                  onClick={() => router.push("/chats")}
                  className="navBtn rotate-45"
                />
                <div className="absolute -top-2 -right-2 text-xs w-5 h-5 bg-red-500 flex items-center justify-center rounded-full animate-pulse text-white">
                  5
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn dark:text-gray-200"
              />
              <UserGroupIcon className="navBtn dark:text-gray-200" />
              <HeartIcon className="navBtn dark:text-gray-200" />
              <img
                src={
                  user
                    ? user.profImg
                      ? user.profImg
                      : user.image
                    : session?.user?.image
                }
                alt="Profile Pic"
                className="h-8 w-8 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
      <SetStatus
        username={session?.user.username}
        active={active}
        setActive={setActive}
      />
    </div>
  );
};

export default Header;
