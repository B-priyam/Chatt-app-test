

import { LoginSchema } from "@/schema"
import * as z from "zod"
import useCurrentUser from "@/store"


export const Login =  (async(values : z.infer<typeof LoginSchema>)=>{

    
    if(!values.email || !values.password){
        return {error : "kindly fill all the fields"}
    }
    
    const res = await fetch('http://localhost:3000/users/getUser',{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            email : values.email,
            password : values.password
        })
    })
    
    const response = await res.json();
    console.log(response)
    if(response.error){
        return {error : response.error}
    }
    
    if(response.id){
        return {success : "Login successful", data : response}
    }
    return {error : "Something went wrong"}

})