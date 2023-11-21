"use client";
import Card from "./Card.js"
import avatar from "../pics/avatar.jpeg"
import Avatar from "./Avatar.js";
import { useState, useEffect, useContext } from "react";
import supabase from "@/app/helpers/InitSupabase.js";
import Spinner from "./Spinner.js"

export default function PostForm() {
    const [profile, setProfile] = useState(null);
    const[userID, setUserID] = useState(null);
    const [content, setContent] = useState("");
    const [uploads, setUploads] = useState([]);
    const [uploading, setUploading] = useState(false);
     useEffect(() => {
        async function fetchSession() {
           const { data: { user } } = await supabase.auth.getUser();
           await supabase.from("profiles")
           .select()
           .eq("id", user.id)
           .then(result => {
            if(result.data.length) {
                setProfile(result.data[0])
                setUserID(user.id);
            }
           });
          }
          fetchSession()
     }, [,]);
     function createPost() {
        supabase.from("posts")
        .insert({
            author: userID,
            content,
            photos: uploads,
        }).then (response => {
            if (!response.error){
                setContent("");
                setUploads([]);
                alert("Post created");
            }
        });
     }

    async function addPhotos(e) {
        const files = e.target.files;
        if (files.length > 0 ) {
            setUploading(true); 
        for (const file of files){
            const newName = Date.now() + file.name;
            const result = await supabase.storage.from("photos")
            .upload(newName, file);
            if(result.data){
                // const url = `"https://dwxuqztqiskahoyvwxbn.supabase.co/storage/v1/object/public/photos/${result.data.path}"`;
                 const url = "https://dwxuqztqiskahoyvwxbn.supabase.co/" + "storage/v1/object/public/photos/" + result.data.path;
                 console.log(url);
                 setUploads(prevUploads => [...prevUploads, url]);
             }
             else alert("abc");
             };
             setUploading(false);
        }
    }
    

    return(
        <Card>
            <div className="flex gap-3">
                <div>
                    <Avatar url={profile?.avatar}></Avatar>
                </div>
                <textarea value={content} onChange={function (e) {setContent(e.target.value)}} 
                className="grow p-3 h-14 border-4 border-gray-50" placeholder={`Care to share, ${(profile) ? profile?.name : `user`}?`}></textarea>
            </div>
            {uploading && (
                <div key={created_at}>
                    <Spinner></Spinner>
                </div>
            )}
            {uploads.length > 0 && (
                <div className="flex gap-2">
                {uploads.map(upload => (
                    <div className="mt-2">
                        <img className="w-auto h-24 rounded-md" src={upload}></img>
                    </div>
                ))}
                </div>
            )}

            <div className="flex gap-5 items-center mt-2">
                <div className="md:ml-16 ml-8">
                    <label className="flex md:gap-1 hover:cursor-pointer">
                    <input type="file" multiple="multiple" className="hidden" onChange={addPhotos}></input>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <span className="hidden md:block">Photos</span>
                    </label>
                </div>
                <div>
                    <button className="flex md:gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <span className="hidden md:block">People</span>
                    </button>
                </div>
                <div>
                    <button className="flex md:gap-1 whitespace-nowrap">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span className="hidden md:block">Check in</span>
                    </button>
                </div>
                <div>
                    <button className="flex md:gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                        </svg>
                        <span className="hidden md:block">Mood</span>
                    </button>
                </div>
                <div className="grow text-right">
                    <button onClick={createPost} className="bg-socialBlue text-white px-6 md:py-2 py-1 rounded-md">
                        <span className="">Share</span>
                    </button>
                </div>
            </div>
        </Card>
    );
}