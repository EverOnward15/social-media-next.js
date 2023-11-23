"use client";
import { uploadUserProfileImage } from "@/app/helpers/user";
import Preloader from "./Spinner";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Avatar({size, url, editable, onChange}) {
    const [uploading, setUploading] = useState(false);
    const currentPath = usePathname();
    const [avatarSize, setAvatarSize] = useState(false);
    const [countAvatar, setCountAvatar] = useState(false);
   async function changeAvatar(e) {
        const file = e.target.files?.[0];
        if(file) {
            setUploading(true);
            await uploadUserProfileImage(file, "avatars", "avatar")
            if(onChange) onChange();
            setAvatarSize(true);
            setTimeout(() => {
                setUploading(false);
            }, 2000);
            if (currentPath.includes("/profile"))
            setAvatarSize(true);
        }
    }
    let dimensions = "w-12 h-12";
    if (size === "lg") {
    dimensions = "w-24 h-24";
 
    }
    return(
        <div className={`${dimensions} overflow-hidden rounded-full hover:scale-110` }>
            <div className="rounded-full z-0">
                <img src={url} className={`${dimensions} overflow-hidden object-cover bg-white`} alt=""></img>
            </div>
            {uploading && (
                <div className="absolute inset-0 flex items-center bg-white bg-opacity-50 w-2 rounded-full">
                    <div className="flex -mx-1">
                        <Preloader></Preloader>
                    </div>
                </div>
            )}
            {editable && (
                <label className="absolute shadow-sm shadow-black p-1 bg-white rounded-full bottom-0 -mb-4 right-0 cursor-pointer">
                    <input type="file" className="hidden" onChange={changeAvatar}></input>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                </label>
            )
            }
        </div>
    );
}