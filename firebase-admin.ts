import * as admin from 'firebase-admin';
const serviceAccount = require('./service_key.json');

// Only initialize the app if it hasn't been initialized already
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://notion-clone-db100.firebaseio.com',
  });
}

const app = admin.app()
const db = admin.firestore(app);

export { db as adminDb }

