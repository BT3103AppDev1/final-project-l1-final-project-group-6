const admin = require('firebase-admin');
const serviceAccount = require('./data/privateKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Replace file
const documents = require('./data/postsData.json');

async function uploadDocuments() {
  console.log('Starting upload...'); // This should print when the function is called

  const batch = db.batch();

  documents.forEach((doc, index) => {
    const docRef = db.collection('posts').doc();
    console.log(`Adding document ${index + 1} to batch:`, doc); // This should print for each document
    batch.set(docRef, doc);
  });

  try {
    await batch.commit();
    console.log('Documents successfully uploaded!');
  } catch (error) {
    console.error('Failed to upload documents:', error);
  }
}

uploadDocuments().catch(error => {
  console.error('Upload failed:', error);
});
