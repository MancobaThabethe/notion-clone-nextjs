"use client"
import { useTransition } from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { createNewDoucment } from "../../../actions/actions"

function NewDocumentButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      // Create new document
      const { docId } = await createNewDoucment()
      router.push(`/document/${docId}`)
    })
  }
  
  return (
    <Button className="" onClick={handleCreateNewDocument} disabled={isPending}>{ isPending ? "Creating..." : "New Document" }</Button>
  )
}
export default NewDocumentButton