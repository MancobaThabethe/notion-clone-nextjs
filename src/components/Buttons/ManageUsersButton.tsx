"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useTransition} from "react"
import { Button } from "../ui/button"
import { useRoom } from "@liveblocks/react/suspense"
import { removeUser } from "../../../actions/actions"
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs"
import useOwner from "@/lib/useOwner"
import { useCollection } from "react-firebase-hooks/firestore"
import { collectionGroup, query, where } from "firebase/firestore"
import { db } from "../../../firebase"

function ManageUsersButton() {
  const { user } = useUser()
  const isOwner = useOwner()  
  const room = useRoom()
  const [isOpen, setIsOpen] = useState(false)
  const [isRemoving, startTransition] = useTransition()
  const [usersInRoom] = useCollection(user && query(collectionGroup(db, "rooms"), where('roomId', '==', room.id)))


  const handleDelete = (id: string) => {
    if(!id) return
    startTransition(async () => {
        if(!user) return

        const { success } = await removeUser(room.id, id)

        if(success){
            toast.success(`${id} removed from Room successfully`)
        }else{
            toast.error("Oops! Something went wrong. Failed to remove user from the room!")
        }
    })
  }

    return (
    <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={'outline'} size={'sm'} className="text-black border-black hover:opacity-90">
                <DialogTrigger>Users ({usersInRoom?.docs.length})</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                <DialogTitle className="text-black mb-2">Users with Access</DialogTitle>
                <DialogDescription className="text-gray-600">
                    Below is a list of users with access to this documenet.
                </DialogDescription>
                </DialogHeader>
                <hr className="my-2 border-gray-500"/>

                <div className="flex flex-col space-y-2">
                    {/* // Users in the room */}
                    {
                        usersInRoom?.docs.map(doc => (
                            <div key={doc.data().userId} className="flex items-center justify-between">
                                <p className="text-gray-800 font-light">{doc.data().userId === user?.emailAddresses.toString() ? `You (${user?.emailAddresses})` : doc.data().userId}</p>
                                <div className="flex items-center gap-2">
                                    <Button variant={'outline'} className="text-black hover:border-black">{doc?.data().role}</Button>
                                    {
                                        isOwner && (doc.data().userId !== user?.emailAddresses[0].toString()) && (
                                            <Button variant={'destructive'} disabled={isRemoving} onClick={() => handleDelete(doc.data().userId)} size={'sm'}>
                                                {
                                                    isRemoving ? "Removing..." : "Remove"
                                                }
                                            </Button>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </DialogContent>
        </Dialog>
    </div>
  )
}
export default ManageUsersButton