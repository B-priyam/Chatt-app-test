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
import { RegistrationSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import FormError from '@/components/FormError'
import FormSuccess from '@/components/FormSuccess'
import { register } from '@/actions/registeration'
import InputField from '@/components/Input'
import Link from 'next/link'
import useCurrentUser from '@/store'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'


const SignUp = () => {
    const {User} = useCurrentUser()
    const pathname  = usePathname()
    const router = useRouter()
    const [error,setError] = useState<string | undefined>('')
    const [success,setSuccess] = useState<string | undefined>('')

    const form = useForm<z.infer<typeof RegistrationSchema>>({
        resolver : zodResolver(RegistrationSchema),
        defaultValues : {
            email : "",
            name : "",
            password : ""
        }
    })
    const [isPending , startTransition] = useTransition()

    const onSubmit = (values:z.infer<typeof RegistrationSchema>)=> {
        setError("")
        setSuccess("")
        startTransition(async() =>{
            const res = await register((values))
            if(res?.error){
                setError(res?.error)
            }
            if(res?.success){
                setSuccess(res.success)
            }
        })
    }
    useEffect(()=>{
        if(User?.id){
            if(pathname === "/auth/signup"){
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
        <div className='lg:w-1/2 w-full  flex items-center gap-20  flex-col justify-between '>
        <div>
            <h1 className='text-5xl font-semibold font-sans text-center mt-10 '>Stay Connected, Anytime, Anywhere</h1>
        </div>
        <div className='w-[90%] md:w-2/3 h-1/2
         rounded-md'>
            <CardWrapper 
            label='Register'
            >
                <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-[80%]'>
                <div className='space-y-8'>
                <InputField 
                formControl={form.control}
                isPending={isPending}
                label='Name'
                placeholder='John Doe'
                type='text'
                name='name'
                />
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
                <Link href={"/auth/login"}>
                <Button variant={'link'} className='text-center w-full text-gray-300 hover:text-white -mb-4'>Already have an Account ?
                </Button>
                </Link>
                <Button type='submit' className='w-full bg-cyan-600 active:bg-cyan-800 hover:bg-cyan-700' disabled={isPending}>
                    Create an account
                </Button>
            </form>
        </Form>
            </CardWrapper>
        </div>
        </div>
        
    </div>
  )
}

export default SignUp