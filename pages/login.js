import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col m-auto col-span-3 items-center mt-20 shadow-lg rounded-lg w-full md:w-1/2 h-screen p-20 dark:bg-gray-900">
            <div className="relative w-52 h-52">
                <Image
                    alt="img"
                    onClick={() => router.push('/')}
                    src='https://links.papareact.com/jjm'
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <h6 className="px-2 py-1 text-sm font-bold italic mt-10 text-gray-600 dark:text-gray-400">Welcome To Insta-2.0</h6>
            <button onClick={signIn} className="p-2 px-3 bg-blue-400 shadow-lg border rounded-lg text-lg font-bold italic mt-2 text-white cursor-pointer hover:text-blue-500 hover:bg-gray-50 dark:bg-slate-900 dark:border-slate-500 dark:text-gray-300 dark:hover:text-blue-600">Go To SignIn Page</button>
        </div>
    )
}

export default Login;