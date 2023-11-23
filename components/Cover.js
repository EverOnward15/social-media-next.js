"use client";
import supabase from "@/app/helpers/InitSupabase.js";
import { useState } from "react";
import Preloader from "./Spinner";
import { uploadUserProfileImage } from "@/app/helpers/user";
import LightboxGallery from "./LightBox";

export default function Cover({url, editable, onChange}) {
    const[uploading, setUploading] = useState(false);
    async function updateCover(e) {
        const file = e.target.files?.[0];
        if(file) {
            setUploading(true);
            await uploadUserProfileImage(file, "covers", "cover")
            if(onChange) 
            {
                onChange();
                setTimeout(() => {
                    setUploading(false);
                }, 2000);
            }
            setTimeout(() => {
                setUploading(false);
            }, 2000);
    }
}
    return (
        <div className="h-40 justify-center rounded-md flex overflow-hidden items-center">
            <div>
                <LightboxGallery className="object-cover" group={url} images={url} alt=""></LightboxGallery>
            </div>
            {uploading && (
                <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center z-10">
                    <div className="inline-block mx-auto mb-10 md:mb-20">
                    <Preloader></Preloader>
                    </div>
                </div>
            )}
            {editable && (
                <div className="absolute flex top-32 mx-3 -my-4 right-0 md:top-20 md:right-0 md:mx-3 md:my-8 shadow-sm shadow-black ">
                    <label className="bg-white p-1 md:py-1 md:px-4 flex gap-1 items-center rounded-md">
                        <input type="file" onChange={updateCover} className="hidden"></input>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 bg-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        <span className="hidden md:block">Change Cover</span>
                    </label>
                </div>
            )
            }
        </div>
    )
}