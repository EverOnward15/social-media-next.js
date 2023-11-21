'use client';
import PostCard from "@/components/PostCard";
import ProfilePage from "../page";
//import { useRouter } from 'next/navigation'
import { useSearchParams } from "next/navigation";

export default function ProfilePageId ({params}) {
    //const router = useRouter;
    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    // console.log(router);
    // console.log(router.id);
    console.log(search);
    return(
        <ProfilePage></ProfilePage>
    )
}

