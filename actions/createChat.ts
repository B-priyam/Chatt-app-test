"use server"

export const createChate = async (currentUserId : string,chatUserId : string)=> {
    const res = await fetch("http://localhost:3000/chats/",{
        method:"POST",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify({
            isGroup : false,
            users : [chatUserId,currentUserId]
        })

    })
    const response = await res.json()
    console.log(response)
}

export const deleteChat = async (chatData : string) => {
    console.log(chatData)
}