import LiveBlocksProvider from "@/components/LiveBlocksProvider/LiveBlocksProvider"
import type { Metadata } from 'next'
 
// either Static metadata
export const metadata: Metadata = {
  title: "Document",
}

function Layout({children}: {children: React.ReactNode}) {
  return (
    <LiveBlocksProvider>{children}</LiveBlocksProvider>
  )
}
export default Layout