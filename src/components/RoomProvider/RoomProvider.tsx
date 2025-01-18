"use client"
import { ClientSideSuspense, RoomProvider as RoomProviderWrapper } from '@liveblocks/react/suspense'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import LiveCursorProvider from '../LiveCursorProvider/LiveCursorProvider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Document - Notion Clone`,
}

function RoomProvider({children, roomId}: {children: React.ReactNode, roomId: string}) {
    return (
    <RoomProviderWrapper id={roomId} initialPresence={{cursor: null}} autoConnect={true}>
        <ClientSideSuspense fallback={<LoadingSpinner />}>
            <LiveCursorProvider>
                {children}
            </LiveCursorProvider>
        </ClientSideSuspense>
    </RoomProviderWrapper>
  )
}
export default RoomProvider