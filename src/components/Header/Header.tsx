"use client"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs"

function Header() {
  const { user } = useUser()

    return (
    <div className="flex items-center justify-between p-5">
        {
            user?.firstName ? (
                <Link href={'/'}><h1 className="text-2xl">{user?.firstName}&apos;s Space</h1></Link>
            ) : (<h1 className="text-2xl">Clone Notion Space</h1>)
        }

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