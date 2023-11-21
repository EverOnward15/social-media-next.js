"use client"; 
import Card from "./Card";
import Avatar from "./Avatar";
import { ClickOutHandler } from 'react-clickout-ts'
import { useContext, useRef, useState } from "react";
import Link from "next/link";
import { formatTimeAgo } from "@/app/helpers/InitTimeAgo";
import { UserContext } from "./contexts/UserContext";


export default function({content, created_at, photos, profiles: profiles}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const ignoreRef = useRef(null);
    const unixTimestamp = new Date(created_at).getTime() / 1000;
    const {profile: myProfile} = useContext(UserContext);
    return(
        <Card>
        <div className="flex gap-3">
          <div>
            <Link href={"/profile/" + profiles?.id }>
                <span className="hover:cursor-pointer">
                    <Avatar url={profiles?.avatar}></Avatar>
                </span>
            </Link>
          </div>
          <div className="grow">
            <p>
                <span className="font-semibold hover:underline cursor-pointer">
                    {profiles?.name} 
                </span> shared a <span className="text-socialBlue">post</span>
            </p>
            <p className="text-gray-500 text-sm">
                 {/* {formatTimeAgo(created_at)}  */}
            </p>
          </div>
          <div>
            <button ref={ignoreRef} className="text-gray-400" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </button>
            <ClickOutHandler ignoredElements={[ignoreRef.current]} onClickOut={() => setDropdownOpen(false)}>
                <div className="relative">
                {dropdownOpen && (
                    <div className="absolute -right-6 bg-white shadow-md shadow-gray-300 p-3 rounded-sm border border-gray-100 w-52">
                    <a className="flex gap-3 py-3 my-2 hover:bg-socialBlue hover:text-white -mx-2 px-2 rounded-md transition-all hover:scale-105 hover:shadow-md shadow-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                        Save post
                    </a>
                    <a className="flex gap-3 py-3 my-2 hover:bg-socialBlue hover:text-white -mx-2 px-2 rounded-md transition-all hover:scale-105 hover:shadow-md shadow-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                        </svg>
                        Notifications off
                    </a>
                    <a className="flex gap-3 py-3 my-2 hover:bg-socialBlue hover:text-white -mx-2 px-2 rounded-md transition-all hover:scale-105 hover:shadow-md shadow-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Hide post
                    </a>    
                    <a className="flex gap-3 py-3 my-2 hover:bg-socialBlue hover:text-white -mx-2 px-2 rounded-md transition-all hover:scale-105 hover:shadow-md shadow-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Delete
                    </a>
                    <a className="flex gap-3 py-3 my-2 hover:bg-socialBlue hover:text-white -mx-2 px-2 rounded-md transition-all hover:scale-105 hover:shadow-md shadow-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                    </svg>
                        Report
                    </a>
                    </div>
                    )}
                </div>
            </ClickOutHandler>
          </div>
        </div>
        <div>
            <p className="my-3 text-sm">
            {content}
            </p>
            {photos?.length>0 && (
                <div className="flex gap-4">
            {photos.map(photo => (
                <div className="">
                    <img src={photo} className="rounded-md h-auto"></img>
                </div>
            ))}
            </div>
            )}

            {/* <div className="overflow-hidden rounded-md">
                <img src="https://images.unsplash.com/photo-1515843224178-84cc9043477c?auto=format&fit=crop&q=80&w=2987&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
            </div> */}
            <div className="mt-3 flex gap-8">
                <button className="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                100
                </button>
                <button className="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    10
                </button>
                <button className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
                    1
                </button>
            </div>
            <div className="flex mt-4 gap-3">
                <div>
                <Avatar url={profiles?.avatar}></Avatar>
                </div>
                <div className="border grow rounded-full relative">
                <textarea className="block w-full p-3 px-4 h-12 overflow-hidden mb-1 rounded-full" placeholder="Leave a comment"></textarea>
                <button className="absolute top-3 right-7 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                </button>
                </div>
            </div>
        </div>
      </Card>
    );
}