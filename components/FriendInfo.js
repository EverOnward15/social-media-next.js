import Avatar from "./Avatar"
export default function Friends() {
    return(
        <div className="flex gap-2">
        <Avatar>
        </Avatar>
        <div>
            <h3 className="font-bold text-xl">Rahul</h3>
            <div className="text-sm leading-3">5 mutual friends</div>
        </div>
    </div>
    )
}