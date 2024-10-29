"use client";

import SideBar from "@/components/SideBar";
import getCurrentUser, { useAllChats } from "@/store";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import MessagesPage from "@/components/MessagesPage";
import { user } from "@/types";
import { getChats } from "@/actions/getChats";
import { io } from "socket.io-client";


let socket:any;
export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const { User } = getCurrentUser();
  const {setAllChats} = useAllChats()
   const [onlineUsers, setOnlineUsers] = useState<any>([]);

  useEffect(() => {
    if (!User.id) {
      if (pathname === "/") {
        router.replace("/auth/signup");
      }
    }
  }, [User, pathname, router]);



  // const getAllChats = useCallback(async () => {
  //   const chatData = await getChats(User.id);
    
  //   if (chatData.length > 0) {
  //     const arr = chatData.reverse().map((chat: user) => ({
  //       ...chat.users[0],
  //       activeChat: chat.id,
  //       lastMessage: chat.lastMessage?.content,
  //       userData: { name: chat.users[0].name },
  //     }));
  
  //     // Update all chats at once
  //     console.log(arr)
  //     setAllChats(arr);
  //   }else{
  //     setAllChats([])
  //   }
  // }, [User.id, setAllChats])

 
  
useEffect(() => {
    socket = io('http://localhost:3000')
    if(User.id){
      socket.emit('getChats',User.id)
      
      const getAllChats = (allChats:any) => {
        if (allChats.length > 0) {
          const arr = allChats.reverse().map((chat: user) => ({
            ...chat.users[0],
            activeChat: chat.id,
            lastMessage: chat.lastMessage?.content,
            userData: { name: chat.users[0].name },
        }));
        
        // Update all chats at once
        setAllChats(arr)
      }else
      {
         setAllChats([])
      }
    }
    socket.on('getAllChats',getAllChats)
    
    return ()=> {
      socket.off('getAllChats',getAllChats)
    }
  }

    // getAllChats()
})

  return (
    <div className="relative h-screen w-full overflow-hidden flex items">
      {/* Sidebar for large screens */}
      <div className="relative h-full w-1/3 hidden lg:flex scrollable-content">
        <SideBar onlineUsers = {onlineUsers} />
      </div>
      {/* Messages for all screen sizes */}
      <div className="h-full w-full">
        <MessagesPage onlineUsers={onlineUsers} setOnlineUsers={setOnlineUsers}/>
      </div>
    </div>
  );
}
