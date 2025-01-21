"use client"
import Document from "@/components/Document/Document"
import { useRoom } from "@liveblocks/react/suspense"

function Page() {
    // Get document id from navigation
    const room = useRoom()

    return (
      // Move Room Provider to Layout in future
      <main className="flex flex-col flex-1 min-h-screen">
          <Document id={room.id} />
      </main>
  )
}
export default Page