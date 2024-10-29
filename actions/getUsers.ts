export const getUsers = async (searchData:string)=>{
    const res = await fetch("http://localhost:3000/chats/getAll",{
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify({
            searchData
        })
    })
    const response = await res.json()
    return response
}