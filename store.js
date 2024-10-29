import { create, } from "zustand"
import { devtools, persist } from "zustand/middleware"

const currentUser = (set) => ({
    User : {
        id:""
    },
    setUser : (userData) => {
        set(()=>({
            User : userData
        }))
    },
    removeUser : (id) => {
        set(()=>({
            User : {}
        }))
    }
})

const chat = (set) => ({
    activeChat : {
        id:"",
        name:"",
        profile:""
    }
    ,
    setChat : (data) => {
        set(()=>({
            activeChat:data
        }))
    }
})

const allChats = (set)=>({
    allChats : [],
    setAllChats : (data)=>{
        set(()=>({
            allChats:data
        }))
    }
})

export const useAllChats = create(
    devtools(
        persist(allChats,{
            name:allChats
        })
    )
)

export const useactiveChat = create(
    devtools(
        persist(chat,{
            name:"activeChat"
        })
    )
)

const useCurrentUser = create(
    devtools(
        persist(currentUser,{
            name:"user"
        })
    )
)

export default useCurrentUser