"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import {useState, useTransition} from "react"
import { Button } from "../ui/button"
import { useRoom } from "@liveblocks/react/suspense"
import { useRouter } from "next/navigation"
import { deleDocument } from "../../../actions/actions"
import { toast } from "sonner"

function DeleteDocument() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, startTransition] = useTransition()
  const router = useRouter()
  const id = useRoom().id

  const handleDelete = async () => {
    if(!id) return

    startTransition(async () => {
        const { success } = await deleDocument(id)

        if(success){
            setIsOpen(false)
            router.replace('/')
            toast.success("Room deleted successfully")
        }else{
            toast.error("Something went wrong. Failed to delete room!")
        }
    })
  }

    return (
    <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={'destructive'}>
                <DialogTrigger>Delete</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                <DialogTitle className="text-black mb-2">Are you absolutely sure you want to delete?</DialogTitle>
                <DialogDescription className="text-gray-600">
                    This action cannot be undone. This will permanently delete your document, all its contents
                    and remove all users from this document.
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={isDeleting} onClick={handleDelete} variant={'destructive'}>
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant={'secondary'}>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}
export default DeleteDocument