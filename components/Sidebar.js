"use client";
import Card from "./Card.js"
import { usePathname } from "next/navigation";
import Link from "next/link.js";
import supabase from "@/app/helpers/InitSupabase.js";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";

export default function Sidebar () {
    const pathname = usePathname();
    const router = useRouter();
    const[userID, setUserID] = useState(null);
    const activeElement = "md:text-md text-sm flex md:gap-1 md:gap-3 py-2 mb-2 bg-socialBlue text-white md:-mx-4 md:px-8 px-6 rounded-md shadow-md shadow-gray-300";
    const inactiveElement = "md:text-md text-sm flex md:gap-1 md:gap-3 py-2 my-2 hover:bg-blue-500 hover:bg-opacity-20 md:-mx-2 md:px-6 px-6 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300"; 
    
    const handleSignOut = async () => {
        const { data, error } = await supabase.auth.refreshSession();
        await supabase.auth.signOut();
        router.push('/login');
    }
    useEffect(() => {
        async function fetchSession() {
            const { data: {session} } = await supabase.auth.getSession();
           setUserID(session?.user.id);
          }
          fetchSession()
     }, [,]);

     function pushToProfile() {
       router.push(`/profile/${userID}/friends`);
        // pushToFriends();
     }

    return(
        <Card noPadding={true}>
            <div className="z-9999 sticky ml-1 mr-1 grow overflow-hidden p-1 flex justify-between items-center text-left md:block shadow-md shadow-gray-500 md:shadow-none pt-1">
                <h2 className="text-socialBlue text-xl font-bold md:p-1 md:mb-3 hidden md:block">Fab-book</h2>
                <Link href={"/"} className={pathname === "/" ? activeElement : inactiveElement}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 z-1200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span className="hidden md:block">Home</span>
                </Link>
                <Link href={`/profile/${userID}`} className={pathname.includes(userID) ? activeElement : inactiveElement}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="hidden md:block">My Profile</span>
                </Link>
                <Link href="/saved" className={pathname === "/saved" ? activeElement : inactiveElement}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                    </svg>
                    <span className="hidden md:block">Saved posts</span>
                </Link>
                <Link href={"/notifications"} className={pathname === "/notifications" ? activeElement : inactiveElement}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                    </svg>
                    <span className="hidden md:block">Notifications</span>
                </Link>
                <button className="w-full -my-2" onClick={handleSignOut} >
                    <span className={pathname === "" ? activeElement : inactiveElement}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        <span className="hidden md:block">Logout</span>
                    </span>
                </button>
            </div>
        </Card>
    );
}
