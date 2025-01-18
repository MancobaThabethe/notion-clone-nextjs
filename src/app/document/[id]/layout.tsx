"use client"
import RoomProvider from "@/components/RoomProvider/RoomProvider"
import { usePathname } from "next/navigation"


function Layout({children}: {children: React.ReactNode}) {
  const id = usePathname().split("/")[2]
  return (
    <RoomProvider roomId={id}>{children}</RoomProvider>
  )
}

export default Layout