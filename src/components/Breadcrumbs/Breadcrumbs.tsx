"use client"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { doc } from "firebase/firestore"
import { db } from "../../../firebase"
import { useUser } from "@clerk/nextjs"


function Breadcrumbs() {
    const path = usePathname()
    const user = useUser()
    const segments = path.split("/")
    const [data, loading, error] = useDocumentData(doc(db, "documents", segments[segments.length-1]))

    const Breadcrumbs = (
        <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="hover:text-white">{user.user?.firstName ? `${user.user?.firstName}'s Space` : "Notion Space"}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/documents" className="hover:text-white">{"Documents"}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-white font-bold">{data?.title ? data?.title : "New Document"}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
    )
    

    return (
        <>
            {segments[2] && (path.length > 2) && Breadcrumbs}
        </>
    )
}
export default Breadcrumbs