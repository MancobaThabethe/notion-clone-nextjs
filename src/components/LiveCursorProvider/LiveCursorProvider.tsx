"use client"
import { useOthers, useMyPresence } from "@liveblocks/react/suspense"
import FollowPointer from "../FollowPointer/FollowPointer"

function LiveCursorProvider({children}: {children: React.ReactNode}) {
  const [myPresence, updateMyPresence] = useMyPresence() // Real-time user's cursor coordinates
  const others = useOthers() // Real-time other users' cursor coordinates
  
    const handlePointerMove = (event: React.PointerEvent) => {
        updateMyPresence({
            cursor: {
                x: Math.floor(event.pageX),
                y: Math.floor(event.pageY),
            }
        })
    }

    const handlePointerLeave = () => {
        updateMyPresence({
            cursor: null
        })
    }

    return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
        {/* Render cursors */}
        {others.filter((other) => other.presence.cursor).map(({ connectionId, presence, info }) => (
            <FollowPointer key={connectionId} x={Number(presence.cursor?.x)} y={Number(presence.cursor?.y)} info={info} />
        ))}

        {children}
    </div>
  )
}
export default LiveCursorProvider