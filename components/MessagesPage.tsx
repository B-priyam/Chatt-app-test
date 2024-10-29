import { Camera, EllipsisVertical, PhoneCallIcon, Send, SmilePlusIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import EmojiPicker from 'emoji-picker-react';
import Message from './Message';
import { Button } from './ui/button';
import MobileSideBar from './MobileSideBar';
import { getMessagesByChatId } from '@/actions/message';
import useCurrentUser, { useactiveChat } from '@/store';
import socket from '@/lib/socket';
import { io, Socket } from 'socket.io-client';


interface MessagesPageProps {
  setOnlineUsers: (data: string[]) => void;
  onlineUsers: string[];
}

const MessagesPage = ({ onlineUsers, setOnlineUsers }: MessagesPageProps) => {
  const { activeChat } = useactiveChat();
  const { User } = useCurrentUser();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);

  const socketRef = useRef<Socket | undefined>(undefined);

  // Fetch messages for the active chat
  const getMessages = useCallback(async () => {
    if (activeChat?.id) {
      const fetchedMessages = await getMessagesByChatId(activeChat.id);
      setMessages(fetchedMessages);
    }
  }, [activeChat]);

  useEffect(() => {
    getMessages();
  }, [activeChat, getMessages]);

  useEffect(() => {
    if(!socketRef.current){
      socketRef.current = io('http://localhost:3000',{
        query : {
          userId : User.id
        }
      })
    }
    
    socketRef.current.emit('joinChat', activeChat.id);
    
      const handleOnlineUsers = (users: string[]) => {
        setOnlineUsers(users);
      };
      
      socketRef.current.on('onlineUsers', handleOnlineUsers);
      
      const handleNewMessage = (newMessage: any) => {
        console.log(newMessage)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
  
    socketRef.current.on('newMessage', handleNewMessage);

    return () => {
      if(socketRef.current){
        socketRef.current.off('newMessage', handleNewMessage);
      socketRef.current.off('onlineUsers', handleOnlineUsers);
      socketRef.current.emit('leaveChat', activeChat.id);
      socketRef.current.disconnect();
    socketRef.current = undefined
      }
      // socket.off('newMessage', handleNewMessage);
      // socket.off('onlineUsers', handleOnlineUsers);
      // socket.emit('leaveChat', activeChat.id);
      // socket.disconnect();
    };
  }, [activeChat ,setOnlineUsers]);

  // console.log(activeChat.id)

  const sendMessage = useCallback(() => {
    if (message.trim()) {
      socketRef.current!.emit('sendMessage', {
        senderId: User.id,
        chatId: activeChat.id,
        content: message,
      });
      setMessage('');
    }
  }, [message, activeChat, User]);

  return (
    <div className="bg-cyan-900/30 h-full w-full flex items-center flex-col justify-center relative left-0" onClick={() => setEmojiPicker(false)}>
      <div className="absolute top-0 bg-cyan-800/30 h-[8.5%] w-full px-5 justify-between flex flex-row">
        <div className="flex flex-row items-center h-full gap-2">
          <MobileSideBar onlineUsers={onlineUsers} />
          <Button variant={'ghost'} className="hover:bg-transparent flex flex-row gap-3 hover:scale-105 transition">
            <Image src={activeChat.profile || '/profile.jpg'} alt="profile" height={40} width={40} className="rounded-full" />
            <h2 className="text-white text-lg">{activeChat.name || 'Chat Name'}</h2>
          </Button>
        </div>
        <div className="flex flex-row items-center h-full">
          <Button variant={'ghost'} className="rounded-full">
            <PhoneCallIcon />
          </Button>
          <Button variant={'ghost'} className="rounded-full">
            <Camera />
          </Button>
          <Button variant={'ghost'} className="rounded-full">
            <EllipsisVertical />
          </Button>
        </div>
      </div>

      <div className="flex-1 w-full flex h-[83%] bg-cyan-900/30 absolute">
        <div className="relative bottom-0 w-full flex flex-col gap-3 max-h-[99%] top-5 overflow-x-hidden overflow-visible">
          {messages.length > 0 ? (
            messages.map((message: any) => (
              <Message key={message.id} sender={message.senderId} content={message.content} />
            ))
          ) : (
            <div className="flex h-full w-full justify-center items-center flex-col">
              <div className="relative h-40 w-40">
                <Image src="/no-message.png" alt="no-message" fill />
              </div>
              <p className="text-2xl">Chats not found</p>
            </div>
          )}
        </div>

        {emojiPicker && (
          <div className="absolute bottom-0 hidden md:flex">
            <EmojiPicker searchDisabled onEmojiClick={() => setEmojiPicker(false)} className="relative bottom-0" />
          </div>
        )}
      </div>

        {
          activeChat.id && (
            
      <div className="absolute bottom-0 w-full h-14 flex flex-row items-center gap-3 px-2">
        <div className="flex flex-row w-[95%] gap-2 border border-black justify-between items-center rounded-lg px-2">
          <div className="flex items-center">
            <Button variant={'ghost'} onClick={() => setEmojiPicker(!emojiPicker)} className="hover:bg-transparent">
              <SmilePlusIcon />
            </Button>
            <Input
              className="border-none outline-none ring-0 flex-wrap w-full max-w-[80%] focus-visible:ring-offset-0 focus-visible:ring-0 text-gray-900"
              placeholder="write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div onClick={sendMessage} className="flex items-center justify-center bg-teal-800 rounded-full">
            <Send className="rounded-full w-7 h-7 px-1" />
          </div>
        </div>
      </div> 
        )
        }
    </div>
  );
};

export default MessagesPage;
