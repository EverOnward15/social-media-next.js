"use client";
import PostCard from "@/components/PostCard";
import { usePathname } from "next/navigation";
import supabase from "../helpers/InitSupabase";
import { useState, useEffect } from "react";

//This is the default profile URL profile/posts path for the user whose profilw we want to render
export default function ProfilePage () {
    const[posts, setPosts] = useState([]);
    const pathname = usePathname();
    const urlID = getUrlID();
    //Function to get the exact urlID
    function getUrlID () {
        const repStr = pathname.replace(/\/profile\//g, "");
        return repStr;
    }
    
    //Fetches the URL of the user whose info we want to render, based on pathname in the browser, called once on initial render
      useEffect(() => {
            async function fetchPosts() {
            await supabase.from("posts")
            .select("id, content, created_at, photos, profiles(id, avatar, name)")
            .eq("author", urlID)
            .order('created_at', { ascending: false })
            .then( result => {
              setPosts(result.data);
            }
            )
        }
        fetchPosts();
      }, [urlID]);

    return(
        <div> { posts?.length>0 && posts.map(post => (
            <PostCard key={post.id}{...post}></PostCard>
        )
        )
            }
        </div>
    )
}