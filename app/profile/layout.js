"use client";
import Sidebar from "@/components/Sidebar"
import Card from "@/components/Card"
import Avatar from "@/components/Avatar"
import Link from "next/link"
import MainLayout from "@/components/MainLayout"
import PostCard from "@/components/PostCard"
import { usePathname } from "next/navigation";
import { formatTimeAgo } from "@/app/helpers/InitTimeAgo";
import { useState, useEffect } from "react";
import supabase from "@/app/helpers/InitSupabase.js";
import { fetchIpInfo } from "@/app/helpers/IPInfoContext";
import Cover from "@/components/Cover";

export default function ProfileLayout({children}) {
    const activeTab = "md:ml-3 ml-8 md:p-2 p-1 justify-evenly flex gap-2 items-center border-b-4 border-socialBlue text-socialBlue";
    const inactiveTab = "md:ml-3 ml-8 md:p-3 p-1 justify-evenly flex gap-2 items-center";
    const pathname = usePathname();
    const [session, setSession] = useState(null); //For storing Supabase session object which also contains currently logged in user information
    const [ipInfo, setIpInfo] = useState(null);
    const userId = session?.id;
    const [profile, setProfile] = useState(null);
    const isMyUser = userId === getUrlID();
    const profileUserID = getUrlID();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    
    //Check to see if the url ID in the path name is the same as logged in user for authentication + re-rendering page on refresh.
    function getUrlID () {
        var repStr = pathname.replace(/\/profile\//g, "");
        var g = repStr;
        if (pathname.includes("friends")){
            g = repStr.replace(/\/friends/g, "");
        }
        else if (pathname.includes("photos")){
            g = repStr.replace(/\/photos/g, "");
        }
        else if (pathname.includes("about")){
            g = repStr.replace(/\/about/g, "");
        }
        return g;
    }

    useEffect(() => {
        async function fetchfastSession() {
          const { data: {session} } = await supabase.auth.getSession();
          const sessioninfo = session?.user;
          setSession(sessioninfo);  
        }
        fetchfastSession();
      }, []);

      useEffect(() => {
        // Fetch IP information once and store it in a variable
        async function fetchAndStoreIpInfo() {
          const ipInfo = await fetchIpInfo();
          const city = ipInfo.city;
          const country = ipInfo.country;
          setIpInfo(`${city}, ${country}`);
        }
        fetchAndStoreIpInfo();
      }, []);

    // Fetch profile cover photo (Has to be done again because it's a different layout, also user has to be refetched.)
    useEffect(() => { 
        async function fetchProfile() {

           await supabase.from("profiles")
           .select("id, created_at, avatar, name, cover, place")
           .eq("id", profileUserID)
           .then(result => {
            if(result?.data) {
                setProfile(result.data[0])
            }
            if(result.error){console.log(result.error)}
           });
          }
         
          fetchProfile()
     }, []);

     function fetchUser() {
            supabase.from("profiles")
           .select("id, created_at, avatar, name, cover, place")
           .eq("id", profileUserID)
           .then(result => {
            if(result.data?.length) {
                setProfile(result.data[0])
            }
            if(result.error){console.log(result.error)}
           });
     }

     function saveProfile() {
        supabase.from("profiles")
        .update({
            name,
            place
        })
        .eq("id", profileUserID)
        .then(result => {
            if(!result.error){
                setProfile(prev => ({...prev, name, place}))
            }
            setEditMode(false);
            fetchUser();
        })
     }
    return (
        <MainLayout>
            <Card noPadding={true}>
                    <div className="relative overlfow-hidden">
                       <Cover url={profile?.cover} editable={isMyUser} onChange={fetchUser}></Cover>
                        <div className="absolute top-14 pt-16 left-4 z-20">
                            {session !==null && editMode === false &&
                            <Avatar  size={"lg"} url ={profile?.avatar} editable={isMyUser} onChange={fetchUser}></Avatar>
                            }
                        </div>
                        <div className="md:p-4 p-3 pb-0">
                            <div className="md:ml-32 mt-2 md:px-2 pl-16 ml-18 flex justify-between">
                                <div>
                                    {editMode && (
                                        <div>
                                            <input type="text" required minLength={3} maxLength={100} placeholder={"Your name"} className="md:text-2xl font-bold border md:py-3 md:px-1 mb-1 rounded-md" 
                                                    onChange={e => setName(e.target.value)} 
                                                    value={name}>
                                            </input>
                                        </div>
                                        )}
                                    {!editMode && (
                                        <h1 className="md:text-2xl ml-14 font-bold">
                                           {profile?.name} 
                                        </h1>
                                        )}
                                    {!editMode &&(
                                        <div className="text-grey-500 ml-14 leading-5">  {profile?.place || ipInfo} </div>
                                    )}
                                    {editMode && (
                                        <div>
                                            <input type="text" minLength={2} maxLength={20} placeholder={"Your location"} className="md:text-2xl font-bold border md:py-3 md:px-1 mb-1 rounded-md" 
                                                    onChange={e => setPlace(e.target.value)} 
                                                    value={place}>
                                            </input>
                                        </div>
                                    )}
                                </div>
                                <div>
                                        <div className="flex gap-1 whitespace-nowrap">
                                            {isMyUser && !editMode && (
                                            <button 
                                                onClick={() => {
                                                    setEditMode(true);
                                                    setName(profile?.name);
                                                    setProfile(profile?.place);
                                                    }} 
                                                className="bg-white rounded-md shadow-sm md:py-1 md:px-2 p-1 shadow-gray-400 flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                                <span className="md:block hidden">Edit profile</span>
                                            </button>
                                            )}
                                            {isMyUser && editMode && (
                                            <button onClick={saveProfile} className="bg-white rounded-md shadow-sm md:py-1 md:px-2 p-1 md:ml-1 shadow-gray-400 flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                                <span className="md:block hidden">Update</span>
                                            </button>
                                            )}
                                            {isMyUser && editMode && (
                                            <button onClick={() => {setEditMode(false); fetchUser()}} className="bg-white rounded-md shadow-sm md:py-1 md:px-2 p-1 md:ml-1 shadow-gray-400 flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                <span className="md:block hidden">Cancel</span>
                                            </button>
                                            )}
                                        </div>
                                </div>
                            </div>
                            <div className="flex justify-evenly gap-1 mr-4 mt-2">
                                <Link href={"/profile/" + profile?.id } className={pathname.includes("/about")  || pathname.includes("/friends") || pathname.includes("photos")
                                ? inactiveTab 
                                : activeTab}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                    <span className="hidden md:block">Posts</span>
                                </Link>
                                <Link href={"/profile/" + profile?.id + "/about"} className={pathname.includes("/about") ? activeTab : inactiveTab}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                                <span className="hidden md:block">About</span>
                                </Link>
                                <Link href={"/profile/" + profile?.id + "/friends"} className={pathname.includes("/friends") ? activeTab : inactiveTab}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                                <span className="hidden md:block">Friends</span>
                                </Link>
                                <Link href={"/profile/" + profile?.id + "/photos"} className={pathname.includes("photos") ? activeTab : inactiveTab}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <span className="hidden md:block">Photos</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
                {children}
                </MainLayout>
    )
  }