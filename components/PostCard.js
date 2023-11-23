"use client"; 
import Card from "./Card";
import Avatar from "./Avatar";
import { ClickOutHandler } from 'react-clickout-ts'
import { useContext, useRef, useState } from "react";
import Link from "next/link";
import { formatTimeAgo } from "@/app/helpers/InitTimeAgo";
import { UserContext } from "./contexts/UserContext";
import supabase from "@/app/helpers/InitSupabase";
import { useEffect } from "react";
import workingOnIt from "@/app/helpers/UnderConstruction";
import LightboxGallery from "./LightBox";



export default function PostCard({id, content, created_at, photos, profiles: profiles}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const ignoreRef = useRef(null);
    const [nowProfile, setNowProfile] = useState();
    const [user, setUser] = useState(null);
    const [likes, setLikes] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [saved, setSaved] = useState(false);

    //Fast-fetch user ID and render on refresh
    useEffect(() => {
        async function fetchfastSession() {
        const { data: {session} } = await supabase.auth.getSession();
        const sessioninfo = session?.user;
        setUser(sessioninfo.id);  
        fetchLikes();
        fetchComments();
        fetchSavedPosts(sessioninfo.id);
        }
        fetchfastSession();
    }, []);

    useEffect(() => { 
        async function fetchProfile() {
            const { data: {session} } = await supabase.auth.getSession();
            await supabase.from("profiles")
        .select("avatar")
        .eq("id", session?.user.id)
        .then(result => {
            if(result.data) {
                setNowProfile(result.data[0])
            }
            if(result.error){console.log(result.error)}
        });
        }
        fetchProfile()
    }, []);

    function fetchSavedPosts(user){
        supabase.from("saved_posts")
        .select()
        .eq("post_id", id)
        .eq("user_id", user)
        .then(result => {
            if(result.data.length > 0){
                setSaved(true)
            }
            else {
                setSaved(false);
            }
        })
    }

    function fetchComments(){
        supabase.from("posts")
    .select("*, profiles(*)")
    .eq("parent", id)
    .then(result => {
        setComments(result.data);
    })
    }

    function fetchLikes() {
        supabase.from("likes")
        .select().eq("post_id", id)
        .then(result => {
            setLikes(result.data);
    })}
    
    const isLikedByUser = !!likes?.find(like => like.user_id === user); // Checks to see if current logged-in user has already liked post once

    function toggleLike() {
        if(isLikedByUser){
            supabase.from("likes")
            .delete()
            .eq("post_id", id)
            .eq("user_id", user)
            .then(result => {
                fetchLikes();
            })
            
            return;
        }
        supabase.from("likes")
        .insert({
            post_id: id,
            user_id: user,
        })
        .then(result => {
            fetchLikes();
        })
    }

    function postComment(e) {
        e.preventDefault();
        supabase.from("posts")
        .insert({
            content: commentText,
            author: user,
            parent: id,
        })
        .then(result => {
            console.log(result);
            fetchComments();
            setCommentText("")
        })
    }

    function toggleSavePost(user) {
        if(saved === false){
        supabase.from("saved_posts")
        .insert({
            user_id: user,
            post_id: id,
        }).then(result => {
            alert("Post bookmarked!");
            setSaved(true);
        })
        return
    }
        else {
        supabase.from("saved_posts")
        .delete()
        .eq("post_id", id)
        .eq("user_id", user)
        .then(result => {
            alert("Post deleted!")
            setSaved(false);
        })
        }
    }

    return(
        <Card>
        <div className="flex items-center gap-3">
          <div>
            <Link href={"/profile/" + profiles?.id }>
                <span className="hover:cursor-pointer">
                    <Avatar url={profiles?.avatar}></Avatar>
                </span>
            </Link>
          </div>
          <div className="grow">
            <p>
                <Link href={"/profile/" + profiles?.id }>
                    <span className="font-semibold hover:underline cursor-pointer">
                        {profiles?.name} 
                    </span> shared a <span className="text-socialBlue">post</span>
                </Link>
            </p>
            <p className="text-gray-500 text-sm">
                  {formatTimeAgo(created_at)}  
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
                    <button onClick={()=> {toggleSavePost(user); setDropdownOpen(false)}} className="w-full -my-2">
                        <span className=" flex gap-3 py-3 my-2 hover:bg-socialBlue hover:text-white -mx-2 px-2 rounded-md transition-all hover:scale-105 hover:shadow-md shadow-gray-300">
                            {saved === false && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                            )}
                            {saved === true && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                                </svg>
                            )}
                            {saved ? "Unsave post" : "Save post"}
                        </span>
                    </button>
                    <a onClick={()=> {workingOnIt();setDropdownOpen(false)}} className="flex gap-3 py-3 my-2 hover:bg-socialBlue hover:text-white -mx-2 px-2 rounded-md transition-all hover:scale-105 hover:shadow-md shadow-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                        </svg>
                        Notifications off
                    </a>
                    <a onClick={()=> {workingOnIt();setDropdownOpen(false)}} className="flex gap-3 py-3 my-2 hover:bg-socialBlue hover:text-white -mx-2 px-2 rounded-md transition-all hover:scale-105 hover:shadow-md shadow-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Hide post
                    </a>    
                    <a onClick={()=> {workingOnIt();setDropdownOpen(false)}} className="flex gap-3 py-3 my-2 hover:bg-socialBlue hover:text-white -mx-2 px-2 rounded-md transition-all hover:scale-105 hover:shadow-md shadow-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Delete
                    </a>
                    <a onClick={()=> {workingOnIt();setDropdownOpen(false)}} className="flex gap-3 py-3 my-2 hover:bg-socialBlue hover:text-white -mx-2 px-2 rounded-md transition-all hover:scale-105 hover:shadow-md shadow-gray-300">
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
            <p className="my-3 p-1 text-sm">
            {content}
            </p>
            {photos?.length>0 && (
                <div className="flex gap-4">
            {photos.map(photo => (
                <div key={photo} className="">
                    <LightboxGallery images={photo} group={id} className="rounded-md h-auto"></LightboxGallery>
                </div>
            ))}
            </div>
            )}

            <div className="mt-3 flex gap-8">
                <button onClick={toggleLike} className="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"w-6 h-6 " + (isLikedByUser ? "fill-red-500" : "")}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    {likes?.length}
                </button>
                <button onClick={workingOnIt} className="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    {comments.length}
                </button>
                <button onClick={workingOnIt} className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
                    1
                </button>
            </div>
            <div className="flex z-0 mt-4 gap-3">
                <div>
                <Avatar url={nowProfile?.avatar}></Avatar>
                </div>
                    <div className=" border grow overflow-hidden just flex rounded-full">
                        <form className="grow w-full " onSubmit={postComment}>
                            <input required maxLength={2000} value={commentText}
                            onChange={e=> setCommentText(e.target.value)}
                            className="w-full outline-none md:ml-5 p-3 px-4 h-12 mb-1 rounded-full" placeholder="Leave a comment"></input>
                        </form>
                        <button onClick={workingOnIt} className="mr-10 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </button>
                    </div>
            </div>
        </div>
        <div>
            {comments.length > 0 && comments?.map(comment =>(
                    <div className="flex gap-2 mt-2 items-center" key={comment.created_at}>
                        <Link href={`/profile/${comment.profiles?.id}`}>
                            <Avatar url={comment.profiles.avatar}></Avatar>
                        </Link>
                        <div className="bg-gray-300 ml-1 py-2 px-6 rounded-full">
                            <div>
                            <Link href={`/profile/${comment.profiles?.id}`}>
                                <span className="hover:underline leading-3 font-medium text-md mr-1">{comment.profiles.name}</span>
                            </Link> 
                                <span className="text-sm text-gray-500">{formatTimeAgo(comment.created_at, "twitter")}</span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                        </div>
                    </div>
                ))
            }
        </div>
      </Card>
    );
}