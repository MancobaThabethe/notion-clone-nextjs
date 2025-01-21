"use client"
import { FormEvent, useEffect, useState, useTransition } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"
import Editor from "../Editor/Editor"
import useOwner from "@/lib/useOwner"
import DeleteDocument from "../Buttons/DeleteDocument"
import InviteUser from "../Buttons/InviteUserButton"
import ManageUsersButton from "../Buttons/ManageUsersButton"
import Avatars from "./Avatars"

function Document({id}: {id: string}) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id))
    const [input, setInput] = useState<string>("")
    const [isUpdating, startTransition] = useTransition()
    const isOwner = useOwner()

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
    <div className="flex-1 h-full bg-white p-5 rounded-xl shadow-lg">
        <div className="flex max-w-6xl mx-auto justify-between pb-5">
            {/* Update title Input */}
            <form onSubmit={handleUpdate} className="flex flex-1 space-x-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} className="text-black border border-gray-400 text-xl"/>
                <Button className="inline bg-black" onClick={handleUpdate} disabled={isUpdating} type="submit">{isUpdating ? "Updating..." : "Update"}</Button>
                {
                  isOwner && (
                    <>
                      {/* Invite user */}
                      <InviteUser />

                      {/* Delete document */}
                      <DeleteDocument />
                    </>
                  )
                }
            </form>
        </div>

        <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
            {/* Manage Users */}
            <ManageUsersButton />

            {/* Avatars */}
            <Avatars />
        </div>

        <h1 className="text-4xl text-center font-light text-black">{data?.title}</h1>

        {/* Collaborative Editor */}
        <Editor />
    </div>
  )
}
export default Document