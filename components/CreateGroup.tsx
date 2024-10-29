import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { UsersRoundIcon } from "lucide-react"
  

const CreateGroup = () => {
  return (
    <div className="">
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} className="hover:bg-cyan-700 active:bg-cyan-800">
                    <UsersRoundIcon />+
                </Button>
            </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default CreateGroup