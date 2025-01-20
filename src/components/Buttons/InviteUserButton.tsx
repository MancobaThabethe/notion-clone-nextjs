"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {FormEvent, useState, useTransition} from "react"
import { Button } from "../ui/button"
import { useRoom } from "@liveblocks/react/suspense"
import { inviteUser } from "../../../actions/actions"
import { toast } from "sonner"
import { Input } from "../ui/input"

function InviteUserButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isInviting, startTransition] = useTransition()
  const id = useRoom().id

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault()
    if(!id) return

    startTransition(async () => {
        const { success } = await inviteUser(id, email)

        if(success){
            setIsOpen(false)
            setEmail('')
            toast.success(`${email} added to Room successfully`)
        }else{
            toast.error("Something went wrong. Failed to add user to the room!")
        }
    })
  }

    return (
    <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={'outline'} className="text-black border-black hover:opacity-90">
                <DialogTrigger>Invite</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                <DialogTitle className="text-black mb-2">Invite a User to collaborate!</DialogTitle>
                <DialogDescription className="text-gray-600">
                    Enter the email of the user you want to invite.
                </DialogDescription>
                </DialogHeader>
                <form action="submit" className="flex space-x-2" onSubmit={handleInvite} >
                  <Input type="email" className="flex-1 border-gray-400 text-black" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email"/>
                  <Button type="submit" disabled={!email && isInviting}>{isInviting ? 'Inviting...' : 'Invite'}</Button>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}
export default InviteUserButton