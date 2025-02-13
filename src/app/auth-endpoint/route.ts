import liveblocks from "@/lib/liveblocks";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    // auth().protect() // Ensure user is authenticated

    const authenticate = await auth()
    const { sessionClaims } = await authenticate

    if(!sessionClaims) {
        authenticate.redirectToSignIn()
    }

    const { room } = await req.json()

    const session = liveblocks.prepareSession(sessionClaims?.email as string, {
        userInfo: {
            name: sessionClaims?.name as string,
            email: sessionClaims?.email as string,
            avatar: sessionClaims?.image as string,
        }
    })

    const usersInRoom = await adminDb.collectionGroup("rooms").where("userId", "==", sessionClaims?.email).get()
    const userInRoom = usersInRoom.docs.find(doc => doc.id === room)

    if(userInRoom?.exists){
        session.allow(room, session.FULL_ACCESS)
        const { body, status } = await session.authorize()
        return new Response(body, { status })
    } else {
        return NextResponse.json({
            message: "You are not in this room",
            status: 403
        })
    }
}
