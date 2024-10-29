import { CheckCircledIcon } from "@radix-ui/react-icons"

interface FormSuccessProps {
    message?: string
}

import React from 'react'

const FormSuccess = ({message}:FormSuccessProps) => {
    if(!message)
    {
        return null
    }
  return (
    <div className="bg-emerald-500 p-3 rounded-md flex items-center gap-x-2 text-green-100 text-sm">
        <CheckCircledIcon
        className="h-4 w-4"
        />
        <p>{message}</p>
    </div>
  )
}

export default FormSuccess