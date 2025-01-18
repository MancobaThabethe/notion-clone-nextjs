"use server"
import { auth } from "@clerk/nextjs/server"
import { adminDb } from "../firebase-admin"

export async function createNewDoucment() {
    const authenticate = await auth()
    // authenticate.protect() -- Not required since Clerk automatically protects every route unless specified otherwise

    if (!authenticate.sessionClaims) {
        authenticate.redirectToSignIn()
    }

    const { sessionClaims } = await authenticate

    const documentCollectionRef = adminDb.collection("documents")
    const documentRef = await documentCollectionRef.add({
        title: "New Document",
        createdAt: new Date(),
    })

    await adminDb.collection("users").doc(sessionClaims?.email as string).collection("rooms").doc(documentRef.id).set({
        userId: sessionClaims?.email,
        role: "owner",
        createdAt: new Date(),
        roomId: documentRef.id
    })

    return { docId: documentRef.id }
}