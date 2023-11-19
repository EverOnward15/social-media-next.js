"use client"
import LoginPage from "./login/page.js";
import MainLayout from "../components/MainLayout.js";
import PostForm from "../components/PostForm.js";
import PostCard from "@/components/PostCard.js";
import supabase from "@/app/helpers/InitSupabase.js";
import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const[posts, setPosts] = useState([]);
  const[profile, setProfile] = useState(null);
  //Fetch session information from Supabase and also get posts information 
  useEffect(() => {
    async function fetchSession() {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        console.log(user);
        supabase.from("posts")
        .select("id, content, created_at, profiles(id, avatar, name)")
        .order('created_at', { ascending: false })
        .then( result => {
          setPosts(result.data);
        }
        )
    }
    fetchSession()
  }, [])
  useEffect(() => {
    async function fetchProfiles() {
       const { data: { user } } = await supabase.auth.getUser();
       await supabase.from("profiles")
       .select()
       .eq("id", user.id)
       .then(result => {
        console.log(result);
        if(result.data.length) {
            setProfile(result.data[0])
        }
       });
      }
      fetchProfiles()
 }, [user]);
      // Call fetchPosts whenever the posts array changes. This will trigger a re-fetch when a new post is added
    // useEffect(() => {
    //   async function fetchPosts() {
    //     const result = await supabase.from("posts")
    //       .select("id, content, created_at, profiles(id, avatar, name)")
    //       .order('created_at', { ascending: false })
    //       .then( result => {
    //         setPosts(result.data);
    //       }
    //       )
    //   }
    //   fetchPosts();
    // }, [posts])
  return ( 
      user ? (
        <MainLayout>
          <PostForm/>
          {posts?.length>0 && posts.map(post => (
          <PostCard key={post.id} {...post}/>
          ))}
        </MainLayout>
      ) : (
        <LoginPage></LoginPage>
      )
  )
}



  // const session2 = supabaseClientModule.auth.session();
  // if(!session)
  // console.log("no session");
  // console.log(session);
  // if(!session) {
  //   return (<LoginPage></LoginPage>)}
  // return (
    // <MainLayout>
    //   <PostForm />
    //   <PostCard />
    // </MainLayout>
  // );
  // }
  


// export async function retrieveSession() {
//   try{
// const { data, error } = await supabase.auth.getSession();
//     console.log(data);
//   }
//  catch (error) {
//   console.error("Error was: ", error);
//   }
// }