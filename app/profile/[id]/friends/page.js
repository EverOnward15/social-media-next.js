import Avatar from "@/components/Avatar"
import Card from "@/components/Card"
import FriendInfo from "@/components/FriendInfo"

export default function FriendsPage() {
    return(
    <Card>
        <h2 className="text-2xl mb-2">Friends</h2>
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
    )
}