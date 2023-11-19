import PostCard from "@/components/PostCard";
import ProfilePage from "../page";
import Card from "@/components/Card";

export default function Photos() {
    return(
        <Card>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-md md:h-48 h:36 shadow-md flex items-center overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1611832197549-ff910be125dd?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                </div>
                <div className="rounded-md md:h-48 h:36 shadow-md flex items-center overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1559080463-5c7eb3a52de1?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                </div>
                <div className="rounded-md md:h-48 h:36 shadow-md flex items-center overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1596203721435-47040fbf51a1?q=80&w=2935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                </div>
                <div className="rounded-md md:h-48 h:36 shadow-md flex items-center overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1552065033-64247bdddccd?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                </div>
            </div>
        </Card>
    )
}