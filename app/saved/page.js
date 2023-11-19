import PostCard from "@/components/PostCard";
import Layout from "@/components/MainLayout";

export default function SavedPosts() {
    return(
        <Layout>
        <div>
        <h1 className="text-5xl mb-4 text-gray-400">Saved Posts</h1>
        <PostCard></PostCard>
        <PostCard></PostCard>
       </div>
       </Layout>
    )
}