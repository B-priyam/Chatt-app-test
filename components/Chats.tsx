import { cn } from "@/lib/utils"
import { DeleteIcon, Dot, Eye, LucideDelete, Trash2 } from "lucide-react"
import Image from "next/image"
import useCurrentUser, { useactiveChat, useAllChats } from "@/store"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { deleteChat } from "@/actions/createChat"
import { useCallback, useEffect } from "react"
import {io} from "socket.io-client"
import { string } from "zod"
import { getChats } from "@/actions/getChats"

interface ChatsProps {
    name: string,
    image: string,
    email?: string,
    isOnline?: boolean,
    isTyping?: boolean,
    id?: string,
    className?: string,
    lastMessage: string
}

let socket:any;
const Chats = ({ image, name, isOnline, isTyping, id, className, lastMessage,email }: ChatsProps) => {
    const {User} = useCurrentUser()
    const {setAllChats} = useAllChats()
    const {activeChat,setChat} = useactiveChat()
    // const { activeChat, setChat } = useactiveChat()

    const fetchChats = useCallback(async () => {
        const fetchedChats = await getChats(User.id);
        setChat(fetchedChats);
      }, [User.id]);
    
      useEffect(() => {
        fetchChats();
      }, [fetchChats]);
    
      // Initialize socket connection and handle real-time updates
      useEffect(() => {
        socket = io('http://localhost:3000', { query: { userId: User.id } });
    
        socket.on('connect', () => {
          console.log('Connected to WebSocket');
        });
    
        // Listen for the chatDeleted event to update the chat list
        socket.on('chatDeleted', (deletedChatId: string) => {
          setAllChats((prevChats:any) =>
            prevChats.filter((chat:any) => chat.id !== deletedChatId)
          );
          if (activeChat?.id === deletedChatId) {
            setChat(null); // Deselect the active chat if it's deleted
          }
        });
    
        return () => {
          socket.disconnect();
        };
      }, [User.id, activeChat]);
    
      // Function to delete a chat
      const deleteChat = (chatId: string) => {
        socket.emit('deleteChat', { chatId, userId: User.id });
      };
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className={cn(`h-14 ${activeChat.id === id ? "bg-cyan-700/50" : "bg-transparent"} rounded-full w-full flex flex-row items-center gap-2 cursor-pointer py-1 justify-between px-5`, className)} onClick={() => setChat({ id: id, name: name, profile: image })}>
                    <div className="relative h-10 w-10">
                        <Image
                            src={image}
                            alt="profile"
                            fill
                            className="rounded-full border bg-cyan-800"
                        />
                    </div>
                    <div className="w-[65%] flex flex-col ">
                        <h2 className={cn("text-gray-300 md:text-lg max-w-full truncate", className)}>
                            {name}
                        </h2>
                        <p className={`text-gray-400 md:text-sm text-xs ${isTyping ? "animate-bounce" : "animate-none truncate"}`}>
                            {isTyping ? "typing..." : lastMessage}
                        </p>
                    </div>
                    <div className="w-20 -ml-8 -mr-5 flex items-center justify-center">
                        {isOnline &&
                            <Dot size={100} className='text-emerald-400' />
                        }
                    </div>
                </div>
                <ContextMenuContent >
                    <ContextMenuItem 
                    className="flex flex-row items-center justify-center gap-3" onClick={()=>deleteChat(id!)}>
                        <Trash2 size={15} />
                         Delete Chat
                         </ContextMenuItem>
                    <ContextMenuItem 
                    className="flex flex-row items-center justify-center gap-3">
                        <Eye size={15} />
                        Show Chat
                        </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenuTrigger>
        </ContextMenu>
    )
}

export default Chats