"use client"

import { CardWrapper } from '@/components/CardWrapper'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState, useTransition } from 'react'
import {
    Form,
} from "@/components/ui/form"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import FormError from '@/components/FormError'
import FormSuccess from '@/components/FormSuccess'
import { Login } from '@/actions/login'
import InputField from '@/components/Input'
import Link from 'next/link'
import {Ubuntu} from "next/font/google"
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import useCurrentUser from '@/store'
import { usePathname } from 'next/navigation'


const font = Ubuntu({
    weight : ["500"],
    subsets : ['latin']
})

const LoginPage = () => {
    const {User,setUser} = useCurrentUser()
    const pathname  = usePathname()
    const router = useRouter()
    const [error,setError] = useState<string | undefined>('')
    const [success,setSuccess] = useState<string | undefined>('')

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver : zodResolver(LoginSchema),
        defaultValues : {
            email : "",
            password : ""
        }
    })
    const [isPending , startTransition] = useTransition()

    const onSubmit = (values:z.infer<typeof LoginSchema>)=> {
        setError("")
        setSuccess("")
        startTransition(async() =>{
            const res = await Login((values))
            if(res?.error){
                setError(res?.error)
            }
            if(res?.success){
                setUser(res.data)
                setSuccess(res.success)
                router.push("/")
            }
        })
    }


    useEffect(()=>{
        if(User?.id){
            if(pathname === "/auth/login"){
                router.replace("/")
            }
        }
    },[User,pathname,router])
  return (
    <div className='w-full h-full flex items-center'>
        <div className='relative w-[50%] h-full items-center hidden justify-center bg-slate-600 lg:flex'>
        <Image 
        src={"/chat-image-2.png"}
        alt='signup'
        className='w-1/2 h-2/3 bg-'
        fill
        /> 
        </div>
        <div className='lg:w-1/2 w-full  flex items-center gap-32  flex-col justify-between '>
        <div>
            <h1 className={cn('text-5xl font-semibold font-sans text-center mt-10 ',font.className)}>Conversations That Flow, Connections That Grow.</h1>
        </div>
        <div className='w-[90%] md:w-2/3 h-1/2
         rounded-md'>
            <CardWrapper 
            label='Welcome Back'
            description='Login to continue'
            >
                <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10 w-[80%]'>
                <div className='space-y-8'>
                <InputField 
                formControl={form.control}
                isPending={isPending}
                label='Email'
                name='email'
                placeholder='John@Doe.com'
                type='email'
                />
                <InputField 
                formControl={form.control}
                isPending={isPending}
                label='Password'
                name='password'
                placeholder='******'
                type='password'
                />
                </div>
                {error && <FormError message={error}/>}
                {success && <FormSuccess message={success}/>}
                <Link href={"/auth/signup"}>
                <Button variant={'link'} className='text-center w-full text-gray-300 hover:text-white'>{"Don't have an account ?"}
                </Button>
                </Link>
                <Button type='submit' className='w-full' disabled={isPending}>
                    Login
                </Button>
            </form>
        </Form>
            </CardWrapper>
        </div>
        </div>
        
    </div>
  )
}

export default LoginPage