import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Model from "../components/Model";
import { useSession } from "next-auth/react";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../firebase";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    const addUser = async () => {
      await setDoc(doc(db, "users", session.user.username), {
        username: session.user.username,
        uid: session.user.uid,
        profImg: session.user.image,
        timeStamp: serverTimestamp()
      });
    };
    if (session) addUser();
  }, [session])

  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Insta-2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Feed />
      <Model />
    </div>
  )
}