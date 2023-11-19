import Layout from "@/components/MainLayout";
import Card from "@/components/Card";
import Avatar from "@/components/Avatar";
import Link from "next/link";
export default function NotificationsPage() {
    return (
        <Layout>
            <h1 className="text-5xl mb-4 text-gray-400">Notifications</h1>
            <Card noPadding={true}>
                <div className="">
                    <div className="flex border-b border-gray-100 p-4 gap-2 items-center">
                        <Link href={"/profile"}>
                            <Avatar>
                            </Avatar>
                        </Link>
                        <div>
                                <Link href={"/profile"} className="font-semibold mr-1 hover:underline">John Doe</Link> 
                                liked 
                                <Link href="" className="text-socialBlue hover:underline ml-1">your photo.</Link>
                        </div>
                    </div>
                    <div className="flex border-b border-gray-100 p-4 gap-2 items-center">
                        <Link href={"/profile"}>
                            <Avatar>
                            </Avatar>
                        </Link>
                        <div>
                                <Link href={"/profile"} className="font-semibold mr-1 hover:underline">John Doe</Link> 
                                liked 
                                <Link href="" className="text-socialBlue hover:underline ml-1">your photo.</Link>
                        </div>
                    </div>
                    <div className="flex border-b border-gray-100 p-4 gap-2 items-center">
                        <Link href={"/profile"}>
                            <Avatar>
                            </Avatar>
                        </Link>
                        <div>
                                <Link href={"/profile"} className="font-semibold mr-1 hover:underline">John Doe</Link> 
                                liked 
                                <Link href="" className="text-socialBlue hover:underline ml-1">your photo.</Link>
                        </div>
                    </div>
                </div>
            </Card>
        </Layout>
    );
}