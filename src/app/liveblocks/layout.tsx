"use client";
import {
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";


function Layout({children}: React.PropsWithChildren) {
  return (
    <LiveblocksProvider publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY}>
        <RoomProvider id="200">
            <div className="bg-black text-white">Liveblocks layout
                {children}
            </div>
        </RoomProvider>
    </LiveblocksProvider>
  )
}
export default Layout