import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import { MenuIcon } from "lucide-react"
  import SideBar from "./SideBar"
  
  interface MobileSideBarProps {
    onlineUsers : string[]
  }

  const MobileSideBar = ({onlineUsers}:MobileSideBarProps) => {
    return (
      <Drawer direction="left">
        {/* Drawer Trigger (Menu Icon for mobile view) */}
        <DrawerTrigger>
          <MenuIcon className="flex lg:hidden cursor-pointer" />
        </DrawerTrigger>
  
        {/* Drawer Content (Sidebar content) */}
        <DrawerContent className="h-screen  items-center w-[70%] md:w-[40%] md:max-w-[30%] sm:max-w-[60%] p-0">
          <SideBar onlineUsers={onlineUsers} />
        </DrawerContent>
      </Drawer>
    )
  }
  
  export default MobileSideBar
  