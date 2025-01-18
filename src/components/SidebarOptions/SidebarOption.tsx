import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { db } from "../../../firebase"
import { doc } from "firebase/firestore"

function SidebarOption({href, id}: {href: string, id: string}) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id))
    const pathname = usePathname()
    const isActive =  href.includes(pathname) && pathname !== "/"
  
    return (
    <Link href={href} className={`border text-gray-800 rounded-md ${isActive ? "bg-gray-300 border-black text-black" : "border-gray-400"} text-sm px-4 py-2 truncate`}>{data?.title}</Link>
  )
}
export default SidebarOption