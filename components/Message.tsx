import useCurrentUser from '@/store'
import Image from 'next/image'
import React from 'react'

interface MessageProps {
    isGroup? : boolean,
    sender : string,
    content : string
    image? : any
}

const Message = ({content,sender,isGroup,image}:MessageProps) => {
    const {User} = useCurrentUser()

    // console.log(sender , User.id)
  return (
    <div className='w-full px-2'>
        <div className={`relative w-full flex items-center ${sender === User.id ? "justify-end" : "justify-start"}`}>
            {isGroup && sender !== User.id && (
                <div className='absolute w-10 h-10'>
                <Image 
                src={image}
                fill
                className='w-10 h-10 rounded-full border'
                alt='Profile'
                />
                </div>
            )}
            <p className={`${sender === User.id ? "bg-cyan-800" : "bg-teal-800"} ${isGroup ? "ml-10" : ""} p-2 rounded-full max-w-[70%] text-gray-200 md:max-w-[70%] lg:max-w-[50%] px-4`}>
           {content}
            </p>
        </div>
    </div>
  )
}

export default Message