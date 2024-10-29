import bcrypt from "bcryptjs"

import { RegistrationSchema } from "@/schema"
import * as z from "zod"

export const register = async (values : z.infer<typeof RegistrationSchema>) => {
    if(!values.name || !values.email || !values.password){
        return {error : "fields cannot be empty"}
    }
    const password = await bcrypt.hash(values.password,6)

    const register = await fetch("http://localhost:3000/users",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(
            {
                name : values.name,
                email : values.email,
                password : password
            }
        )
    })

    const response = await register.json()
    console.log("RESPONSE" , response)
    if(response.error){
        return {error : response.error}
    }
    if(response.createdAt){
        return {success : "user created"}
    }
    else{
        return {error : "Something went wrong"}
    }

    // console.log(password)
}