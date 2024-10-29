import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { UserRoundPlus } from "lucide-react"
import InputField from "./Input"
import { Input } from "./ui/input"
import { useCallback, useEffect, useState } from "react"
import Chats from "./Chats"
import { chatsData } from "@/data"
import { getUsers } from "@/actions/getUsers"
import Image from "next/image"
import useCurrentUser from "@/store"
import { createChate } from "@/actions/createChat"

  

const AddChat = () => {
  const {User} = useCurrentUser()
  const [usersList,setUsersList] = useState<any>([])
  const [searchValue,setSearchValue] = useState("")
  useEffect(()=>{
  },[])
  
  const getAll = useCallback(async()=>{
    const data = await getUsers(searchValue)
    console.log(data)
    setUsersList(data)
  },[searchValue])

  useEffect(()=>{
    if(searchValue.length > 2){
        getAll()
    }else{
      setUsersList([])
    }
  },[searchValue,getAll])


  const onClickChat = async (id:string) => {
    const res = await createChate(User.id,id)
    window.location.reload()
  }

  return (
    <Dialog  >
            <DialogTrigger asChild>
                <Button  variant={"ghost"} className="hover:bg-cyan-700 active:bg-cyan-800">
                    <UserRoundPlus />
                </Button>
            </DialogTrigger>
  <DialogContent>
    <DialogHeader className="items-center">
      <DialogTitle className="text-xl">Add Chat</DialogTitle>
      <DialogDescription>
      Enter the Email of the person you want to chat
      </DialogDescription>
    </DialogHeader>
    <div className="items-center">
      <Input 
      placeholder="example@gmail.com"
      className="text-xl py-6"
      value={searchValue}
      onChange={(e)=>{
        setSearchValue(e.target.value);
      }}  
      />
      <div className="max-h-96 overflow-auto items-center text-center py-2">
        {
          usersList?.map((user:any)=>{
            if(user.id === User.id){
              return null
            }
            return (
              <div key={user.id} className={`h-14 bg-transparent"} rounded-full w-full flex flex-row items-center gap-2 cursor-pointer py-1 justify-between px-5`} onClick={()=>onClickChat(user.id)}>
        <div className="relative h-10 w-10">
            <Image
            src={user.image}
            alt="profile"
            fill
            className="rounded-full border bg-cyan-800"
            />
        </div>
        <div className="w-[65%] flex flex-col ">
            <h2 className={"text-black font-semibold md:text-lg max-w-full truncate"}>
                {user.name} 
            </h2>
            <p className="text-gray-800 text-md animate-bounce">
                {user.email}
            </p>
        </div>
        <div className="w-20 -ml-8 -mr-5 flex items-center justify-center">
            
        </div>
    </div>
            )
          })
        }
      </div>
    </div>
  </DialogContent>
</Dialog>
  )
}

export default AddChat