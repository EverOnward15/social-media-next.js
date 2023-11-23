"use client";
import PostCard from "@/components/PostCard";
import MainLayout from "@/components/MainLayout";
import { useEffect, useState } from "react";
import supabase from "../helpers/InitSupabase";

export default function SavedPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
            async function fetchPosts() {
            const { data: {session} } = await supabase.auth.getSession();
            await supabase.from("saved_posts")
            .select("post_id")
            .eq("user_id", session?.user.id)
            .order('created_at', { ascending: false })
            .then( result => {
                //select only the posts that we have bookmarked
            const postIds = result?.data.map(item => item.post_id)
            supabase.from("posts")
            .select("*, profiles(*)")
            .in("id", postIds)
            .is("parent", null)
            .then(result => {
           
                setPosts(result?.data)})
            }
        )
    }
    fetchPosts();
  }, [posts]);
    return(
        <MainLayout>
            <h1 className="text-5xl mb-4 text-gray-400">Saved Posts</h1>
            {posts?.length > 0 && posts.map(post=> (
                    <PostCard key={post.id} {...post}></PostCard>   
            ))}
       </MainLayout>
    )
}