"use client";
import MainLayout from "@/components/MainLayout"
import Card from "@/components/Card"
import { createBrowserClient } from '@supabase/ssr'
import supabase from "@/app/helpers/InitSupabase.js";
import { useRouter } from 'next/navigation'
import workingOnIt from "../helpers/UnderConstruction";


export default function LoginPage() {
    const router = useRouter();
    async function googleLogin() { 
        const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      console.log(data);
      console.log(error);
    }
    async function gitLogin() { 
        supabase.auth.signInWithOAuth({
        provider: 'github',
      })
      router.push('/')
    }

    return (
        <MainLayout hideNavigation={true}>
            <div className="flex items-center h-screen">
                <div className="-mt-24 max-w-xs grow mx-auto">
                    <h1 className="text-5xl mb-4 text-gray-400 text-center">Login</h1>
                    <Card noPadding={true}>
                        <div className="">
                            <button href="" onClick={googleLogin} className="flex w-full gap-4 items-center justify-center p-4 border-b border-b-gray-100 hover:bg-socialBlue hover:border-b-socialBlue hover:text-white mb-2 transition-all hover:rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 fill-current" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.4 166.3 64.9l-67.4 64.9C258.4 52.6 94.3 116.6 94.3 256c0 86.4 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
                                Login with Google
                            </button>
                            <button href="" className="flex w-full gap-4 items-center justify-center p-4 border-b border-b-gray-100 hover:bg-socialBlue hover:border-b-socialBlue hover:text-white mb-2 transition-all hover:rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 fill-current" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.4 0 64.3v383.4C0 465.4 14.3 480 31.9 480H416c17.6 0 32-14.4 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.4-17.3-38.4-38.5S80.9 96 102.2 96c21.2 0 38.4 17.3 38.4 38.4 0 21.3-17.2 38.4-38.4 38.5zm282.1 243h-66.4V312c0-24.8-.4-56.7-34.4-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.4 62.9-34.4 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
                                Login with LinkedIn
                            </button>
                            <button onClick={gitLogin} href="" className="flex w-full gap-4 items-center justify-center p-4 border-b border-b-gray-100 hover:bg-socialBlue hover:border-b-socialBlue hover:text-white mb-2 transition-all hover:rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 fill-current" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-4.2 3.6-3.3.3-4.6-1.3-4.6-3.6 0-2 2.3-3.6 4.2-3.6 3-.3 4.6 1.3 4.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 4.6 0 6.2-2s-1.3-4.3-4.3-4.2c-2.6-.7-4.4.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 4.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-4.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.4 239.2 12.8 2.3 17.3-4.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.4 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.4 0-27.4 7.6-41.3 23.6-58.9-2.6-6.4-11.1-33.3 2.6-67.9 20.9-6.4 69 27 69 27 20-4.6 41.4-8.4 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 4.2 61.4 2.6 67.9 16 17.7 25.8 31.4 25.8 58.9 0 96.4-58.9 104.2-114.8 110.4 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.4 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.4 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 4.2 1.6 1.6 3.9 2.3 4.2 1 1.3-1 1-3.3-.7-4.2-1.6-1.6-3.9-2.3-4.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 4.2 2.6 6.4 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-4.2-2.6-6.4-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 4.9 1.6 2.3 4.3 3.3 4.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-4.6-2z"/></svg>
                                Login with Github
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </MainLayout>
    )
}