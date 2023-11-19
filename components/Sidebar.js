"use client";
import Card from "./Card.js"
import { usePathname } from "next/navigation";
import Link from "next/link.js";
import supabase from "@/app/helpers/InitSupabase.js";
import { useRouter } from 'next/navigation'

export default function Sidebar () {
    //const supabase = createClient("https://dwxuqztqiskahoyvwxbn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3eHVxenRxaXNrYWhveXZ3eGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxOTkwNjAsImV4cCI6MjAxNTc3NTA2MH0.wA2T6VIjU_0VDaZxnGi9hGBl-w0ZYVLNnZwRQtNpb38");
    const pathname = usePathname();
    const router = useRouter();

    const activeElement = "md:text-md text-sm flex md:gap-1 md:gap-3 py-2 mb-2 bg-socialBlue text-white md:-mx-4 md:px-8 px-6 rounded-md shadow-md shadow-gray-300";
    const inactiveElement = "md:text-md text-sm flex md:gap-1 md:gap-3 py-2 my-2 hover:bg-blue-500 hover:bg-opacity-20 md:-mx-2 md:px-6 px-6 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300"; 
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login')
    }
    return(
        <Card noPadding={true}>
            <div className="p-1 flex justify-between text-left md:block shadow-md shadow-gray-500 md:shadow-none">
                <h2 className="text-gray-400 md:p-1 md:mb-3 hidden md:block">Navigation</h2>
                <Link href={"/"} className={pathname === "/" ? activeElement : inactiveElement}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span className="hidden md:block">Home</span>
                </Link>
                <Link href="/profile/friends" className={pathname === "/profile/friends" ? activeElement : inactiveElement}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    <span className="hidden md:block">Friends</span>
                </Link>
                <Link href="/saved" className={pathname === "/saved" ? activeElement : inactiveElement}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                    </svg>
                    <span className="hidden md:block">Saved posts</span>
                </Link>
                <Link href="/notifications" className={pathname === "/notifications" ? activeElement : inactiveElement}>
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
