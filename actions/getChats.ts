export const getChats = async (userId:string) => {
    const res = await fetch(`http://localhost:3000/chats/${userId}`)
    const response = await res.json()
    return response
}