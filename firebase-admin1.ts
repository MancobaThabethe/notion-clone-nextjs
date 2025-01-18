import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase/firestore";

const serviceKey = require("./service_key.json");
console.log("service key", serviceKey)

let app: App

if (getApps().length === 0) {
    app = initializeApp({
        credential: cert(serviceKey),
    });
} else {
    app = getApp();
}

if(!app) throw new Error("Firebase app not initialized")

console.log(app.name)

const adminDb = getFirestore(app);

export { app as adminApp, adminDb }