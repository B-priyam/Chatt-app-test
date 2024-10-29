export const sendChat = async (senderId:string,chatId:string,content:string)=>{

    const res = await fetch("http://localhost:3000/message",{
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body : JSON.stringify({
            senderId,
            chatId,
            content
        })
    })

}

export const getMessagesByChatId = async (chatId:string)=>{
    const res = await fetch(`http://localhost:3000/message/${chatId}`)
    const response = await res.json()
    return response
    
}