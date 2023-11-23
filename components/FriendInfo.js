"use client"

import Avatar from "./Avatar"
export default function Friends() {
    return(
        <div className="ml-5 flex gap-5">
            <Avatar url="https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
            </Avatar>
            <div>
                <h3 className="font-bold text-xl">Rahul</h3>
                <div className="text-sm leading-3">5 mutual friends</div>
            </div>
        </div>
    )
}