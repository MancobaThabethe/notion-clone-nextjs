import Document from "@/components/Document/Document"

async function Page({params}: {params: {id: string}}) {
    // Get document id from navigation
    const { id } = await params

    return (
      // Move Room Provider to Layout in future
      <main className="flex flex-col flex-1 min-h-screen">
          <Document id={id} />
      </main>
  )
}
export default Page