"use client"
import LoginPage from "./login/page.js";
import MainLayout from "../components/MainLayout.js";
import PostForm from "../components/PostForm.js";
import PostCard from "@/components/PostCard.js";
import supabase from "@/app/helpers/InitSupabase.js";
require('dotenv').config();
import { useState, useEffect } from "react";
import { UserContext } from "@/components/contexts/UserContext.js";

export default function Home() {
  const [user, setUser] = useState(null);
  const[posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
   
  useEffect(() => {
    async function fetchSession() {
        const { data: { user } } = await supabase.auth.getUser();
        supabase.from("posts")
        .select("id, content, created_at, photos, profiles(id, avatar, name)")
        .is("parent", null) 
        .order('created_at', { ascending: false })
        .then( result => {
          setPosts(result.data);
          setUser(user);
        }
        )
    }
    fetchSession()
  }, [])

      //Call fetchPosts whenever the posts array changes. This will trigger a re-fetch when a new post is added by the user
    useEffect(() => {
      async function fetchPosts() {
          await supabase.from("posts")
          .select("id, content, created_at, photos, profiles(id, avatar, name)")
          .is("parent", null) 
          .order('created_at', { ascending: false })
          .then( result => {
            setPosts(result.data);
          }
          )
      }
      fetchPosts();
    }, [posts]);

    return ( 
      user ? (
        <MainLayout>
          <UserContext.Provider value>
            <PostForm/>
            {posts?.length>0 && posts.map(post => (
            <PostCard key={post.id} {...post}/>
            ))}
          </UserContext.Provider>
        </MainLayout>
      ) : (
        <LoginPage></LoginPage>
      )
  )
}
