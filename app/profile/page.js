import Avatar from "@/components/Avatar";
import MainLayout from "../../components/MainLayout";
import Card from "@/components/Card";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { usePathname } from "next/navigation";
import ProfileLayout from "./layout";
import Posts from "./posts/page";
import PostForm from "@/components/PostForm";
import supabase from "../helpers/InitSupabase";

export default function ProfilePage () {

    return(
        <PostCard></PostCard>
    )
}