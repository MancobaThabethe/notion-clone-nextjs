"use client"
import { SquareMenu } from "lucide-react"
import NewDocumentButton from "../Buttons/NewDocumentButton"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCollection } from 'react-firebase-hooks/firestore'
import { useUser } from "@clerk/nextjs"
import { collectionGroup, DocumentData, query, where } from "firebase/firestore"
import { db } from "../../../firebase"
import { useEffect, useState } from "react"
import SidebarOption from "../SidebarOptions/SidebarOption"

interface RoomDocument extends DocumentData {
  createdAt: string,
  roomId: string,
  userId: string,
  role: "owner" | "editor"
}


function Sidebar() {
  const user = useUser().user
  
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[],
    editor: RoomDocument[]
  }>({
    owner: [],
    editor: []
  })
  
  const [data, loading, error] = useCollection(
    user && (
      query(collectionGroup(db, "rooms"), where('userId', '==', user.emailAddresses[0].toString()))
    )
  )

  useEffect(() => {
    if(!data) return

    const grouped = data.docs.reduce<{
      owner: RoomDocument[],
      editor: RoomDocument[]
    }>((acc, curr) => {
      const roomData = curr.data() as RoomDocument

      if(roomData.role === "owner") {
        acc.owner.push({...roomData, id: curr.id})
      } else {
        acc.editor.push({...roomData, id: curr.id})
      }

      return acc
      }, {
      owner: [],
      editor: []
    })

    setGroupedData(grouped)
  }, [data])
  
  const menuOptions = (
    <>
      <NewDocumentButton />

      {/* My documents */}
      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {groupedData.owner.length === 0 ? (
          <h2 className="text-gray-500 font-semibold text-sm">No documents found</h2>
        ) : (
          <>
            <h2 className="text-gray-500 font-semibold text-md">My Documents</h2>
            {groupedData.owner.map(doc => (<SidebarOption key={doc.roomId} id={doc.roomId} href={`/document/${doc.roomId}`} />))}
          </>
        )}
      </div>
      
      {/* Shared with me list */}
      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {groupedData.editor.length === 0 ? (
        <h2 className="text-gray-500 font-semibold text-sm">No documents shared with you</h2>
        ) : (
          <>
            <h2 className="text-gray-500 font-semibold text-md">Shared with me</h2>
            {groupedData.editor.map(doc => (<SidebarOption key={doc.roomId} id={doc.roomId} href={`/document/${doc.roomId}`} />))}
          </>
        )}
      </div>
    </>
  )
  
  return (
    <div className="p-2 md:p-5 relative bg-gray-200 ">
        <div className="hidden md:inline">
            <div>{menuOptions}</div>
        </div>

        {/* Sheet */}
        <div className="md:hidden bg-slate-600">
          <Sheet>
            <SheetTrigger className=" text-black block">
              <SquareMenu />
            </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]" side={'left'}>
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                        <div>{menuOptions}</div>
                            <SheetDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </SheetDescription>
                    </SheetHeader>
                </SheetContent>
          </Sheet>
        </div>

    </div>
  )
}
export default Sidebar