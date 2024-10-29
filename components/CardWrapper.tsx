import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Ubuntu} from "next/font/google"
import { cn } from "@/lib/utils"


const font = Ubuntu({
  subsets : ["latin"],
  weight : "400"
})

interface CardWrapperProps {
    label : string,
    children : React.ReactNode,
    description?: string,
}



export const CardWrapper = ({label,children,description}:CardWrapperProps) => {
  return (
    <Card className="bg-cyan-900 h-full w-full drop-shadow-xl shadow-2xl">
      <CardHeader>
              <CardTitle className={cn("text-center text-gray-100 text-xl font-semibold",font.className)}>{label}</CardTitle>
        <CardDescription className="text-center text-gray-300 text-md">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-center">
        {children}
      </CardContent>
      
    </Card>
  )
}
