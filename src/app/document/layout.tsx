import LiveBlocksProvider from "@/components/LiveBlocksProvider/LiveBlocksProvider"

function Layout({children}: {children: React.ReactNode}) {
  return (
    <LiveBlocksProvider>{children}</LiveBlocksProvider>
  )
}
export default Layout