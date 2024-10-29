import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface FormErrorProps {
    message?: string
}

import React from 'react'

const FormError = ({message}:FormErrorProps) => {
    if(!message)
    {
        return null
    }
  return (
    <div className="bg-destructive p-3 rounded-md flex items-center gap-x-2 text-red-200 text-lgm">
        <ExclamationTriangleIcon
        className="h-4 w-4"
        />
        <p>{message}</p>
    </div>
  )
}

export default FormError