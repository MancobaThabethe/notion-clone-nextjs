"use server"
import { auth } from "@clerk/nextjs/server"
import { adminDb } from "../firebase-admin"
import liveblocks from "@/lib/liveblocks"

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

export async function deleDocument(id: string) {
    const authenticate = await auth()
    // authenticate.protect() -- Not required since Clerk automatically protects every route unless specified otherwise

    if (!authenticate.sessionClaims) {
        authenticate.redirectToSignIn()
    }

    try {
        // Delete the document reference itself
        await adminDb.collection('documents').doc(id).delete()

        // Find all room references of the document
        const query = await adminDb.collectionGroup('rooms').where('roomId', '==', id).get()
        const batch = adminDb.batch()
        
        // Delete the room reference in the users collection for every users in the room
        query.docs.forEach(doc => {
            batch.delete(doc.ref)
        })

        await batch.commit()

        // Delete the liveblocks room
        await liveblocks.deleteRoom(id)

        return { success: true }
    } catch (error) {
        console.error(error)
        return{ success: false }
    }
}

export async function inviteUser(id: string, email: string) {
    const authenticate = await auth()
    // authenticate.protect() -- Not required since Clerk automatically protects every route unless specified otherwise

    if (!authenticate.sessionClaims) {
        authenticate.redirectToSignIn()
    }

    try{
        await adminDb.collection("users").doc(email).collection("rooms").doc(id).set({
            userId: email,
            role: "editor",
            addedAt: new Date(),
            roomId: id
        })

        return{ success: true }
    }catch(error){
        console.error(error)
        return{ success: false }
    }
}

export async function removeUser(id: string, email: string) {
    const authenticate = await auth()

    if (!authenticate.sessionClaims) {
        authenticate.redirectToSignIn()
    }

    try{
        // Delete the userId from the rrom
        await adminDb.collection("users").doc(email).collection("rooms").doc(id).delete()
        return{ success: true }
    }catch(error){
        console.error(error)
        return{ success: false }
    }
}   