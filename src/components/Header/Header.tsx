"use client"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs"
import { Button } from "../ui/button"
import { MenuIcon } from "lucide-react"
import { SidebarContext } from "@/providers/SidebarProvider"
import { useContext } from "react"

function Header() {
  const { user } = useUser()
  const sidebarState = useContext(SidebarContext)

    return (
    <div className="flex items-center justify-between p-3 md:p-5">
        <div className="flex items-center gap-2">
            <button className="p-1 md:hidden" onClick={() => sidebarState?.updateIsOpen(sidebarState?.isOpen.state)}>
                <MenuIcon color="white" className="bg-black" />
            </button>
            {
            user?.firstName ? (
                <Link href={'/'}><h1 className="text-2xl">{user?.firstName}&apos;s Space</h1></Link>) : (<h1 className="text-2xl">Clone Notion Space</h1>)
            }
        </div>

        {/* Bread crumbs */}
        {/* <Breadcrumbs /> */}

        {/* Account management */}
        <div className="signed">
            <SignedOut>
                <SignInButton />
            </SignedOut>

            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </div>
  )
}
export default Header