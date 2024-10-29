"use client"

import useCurrentUser, { useactiveChat, useAllChats } from "@/store"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import Chats from "./Chats"
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "./ui/input"
import AddChat from "./AddChat"
import CreateGroup from "./CreateGroup"
  


interface SideBarProps {
    onlineUsers : string[]
}

const SideBar = ({onlineUsers}:SideBarProps) => {
    const { User, removeUser } = useCurrentUser()
    const {allChats} = useAllChats()
    const router = useRouter()
    const {setAllChats} = useAllChats()
    const {setChat} = useactiveChat()
    const [user, setUser] = useState<any>()
    const [searchValue, setSearchValue] = useState<string>("")

    useEffect(() => {
        if (User?.id) {
            setUser(User)
        }
    }, [User])

    const logout = () => {
        removeUser(User?.id)
        setAllChats([])
        setChat({})
        router.push("/auth/signup")
    }

    // console.log(allChats)

    return (
        <div className="w-full -mt-6 h-full bg-cyan-900 items-center flex-col justify-center lg:mt-0 py-1 scrollable-content">
            {/* Top profile and logout */}
            <div className="w-full px-5 h-10 bg-cyan-900 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-9 h-9 relative flex items-center justify-center rounded-full">
                        <Image
                            src={user?.profile || "/profile.jpg"}
                            alt="Profile"
                            className="rounded-full"
                            fill
                        />
                    </div>
                    <h2 className="ml-3 text-gray-100 md:text-xl max-w-[160px] truncate">
                        {user?.name}
                    </h2>
                </div>
                <div className="text-gray-300 hover:text-gray-100 cursor-pointer" onClick={logout}>
                    <LogOutIcon />
                </div>
            </div>

            <div className="border-cyan-800 border w-full my-3" />

            {/* Group and Add Chat buttons */}
            <div className="flex justify-around w-full text-white mb-2">
                <CreateGroup />
                <AddChat />
            </div>

            {/* Search Input */}
            <div className="w-full px-5 rounded-xl">
                <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="rounded-xl w-full bg-cyan-950/50 text-gray-200"
                    placeholder="Search..."
                />
            </div>

            <div className="w-full flex flex-col gap-1 items-center py-2 overflow-hidden h-[80vh]">
                <div className="overflow-y-auto no-scrollbar w-full h-full px-2">

                    {
                           allChats.map((chat: any) => {
                                return (
                            <Chats
                                key={chat.id}
                                image="/profile.jpg"
                                name={chat.name}
                                email={chat.email}
                                isTyping={chat.isTyping}
                                isOnline={onlineUsers ?  onlineUsers.includes(chat.id) ? true : false : false}
                                id={chat.activeChat}
                                lastMessage={chat.lastMessage}
                            />
                        )
                    })
                
                }

                    {/* <Chats
            image="/profile.jpg"
            name="Priyam"
            isTyping={true}
            isOnline={true}
            id="1"
            activeChat={activeChat}
            setActiveChat={setActiveChat}
          /> */}
                </div>
            </div>
        </div>
    )
}

export default SideBar
