"use client"
import { FormEvent, useEffect, useState, useTransition } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs"
import { useUser } from "@clerk/nextjs"
import Editor from "../Editor/Editor"
import { useRoom } from "@liveblocks/react/suspense"

function Document({id}: {id: string}) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id))
    const [input, setInput] = useState<string>("")
    const [isUpdating, startTransition] = useTransition()
    const isOwner = useUser()
    const room = useRoom()
    console.log(room)

  useEffect(() => {
    if(data) setInput(data.title)
  }, [data])

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault()

    if(input.trim()){
      startTransition(async () => {
        // Update document
        const docRef = doc(db, "documents", id)
        await updateDoc(docRef, {
          title: input,
          modified: new Date()
        })
      })
    }
  }
  
    return (
    <div>
        <div className="flex max-w-6xl mx-auto justify-between pb-5">
            {/* Update title Input */}
            <form onSubmit={handleUpdate} className="flex flex-1 space-x-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} className="text-black"/>
                <Button className="inline bg-black" onClick={handleUpdate} disabled={isUpdating} type="submit">{isUpdating ? "Updating..." : "Update"}</Button>
            </form>
        </div>
        <h1 className="text-4xl text-center font-light text-black">{data?.title}</h1>
        <Editor />
    </div>
  )
}
export default Document