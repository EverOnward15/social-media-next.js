import MainLayout from "@/components/MainLayout";
import Card from "@/components/Card";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import FriendInfo from "@/components/FriendInfo"
export default function NotificationsPage() {
    return (
        <MainLayout>
            <h1 className="text-5xl mb-4 text-gray-400">Friends</h1>
            <Card>
                <h2 className="text-2xl mb-2">Your friends list</h2>
                <div className="-mx-4 border-b border-b-gray-100 p-4">
                    <FriendInfo></FriendInfo>
                </div>
                <div className="-mx-4 border-b border-b-gray-100 p-4">
                    <FriendInfo></FriendInfo>
                </div>
                <div className="-mx-4 border-b border-b-gray-100 p-4">
                    <FriendInfo></FriendInfo>
                </div>
                <div className="-mx-4 border-b border-b-gray-100 p-4">
                    <FriendInfo></FriendInfo>
                </div>
                <div className="-mx-4 border-b border-b-gray-100 p-4">
                    <FriendInfo></FriendInfo>
                </div>
                <div className="-mx-4 border-b border-b-gray-100 p-4">
                    <FriendInfo></FriendInfo>
                </div>
            </Card>
        </MainLayout>
    );
}

