import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDoc, getDocs, addDoc, doc, updateDoc, orderBy, query } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpTL2ecFwJV_UCQ5Yf7v2sl-onXJGX27s",
  authDomain: "wilmer-portfolio-web.firebaseapp.com",
  projectId: "wilmer-portfolio-web",
  storageBucket: "wilmer-portfolio-web.appspot.com",
  messagingSenderId: "997051434145",
  appId: "1:997051434145:web:894f21f13fa81542b95ce0",
  measurementId: "G-G4NHBQEGN9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage()

// Get a list of cities from your database
async function getCities(db) {
  const projectRef = collection(db, 'MyProjects')
  const q = await query(projectRef, orderBy('order')) 
  const citySnapshot = await getDocs(q);

  const cityList = citySnapshot.docs.map(doc => {
    return { 
        id: doc.id, 
        ...doc.data(), 
    }
  });
  return cityList;
}

async function insertToFirestore(title, desc, color, order, imageLink){
    try {
      const docRef = await addDoc(collection(db, 'MyProjects'), {
        title: title,
        desc: desc,
        color: color,
        order: order,
        image: imageLink
      })
      console.log(docRef)
    } catch (e) {
      console.log(e)
    }
  }
  

export {db, storage, doc, getCities, getDoc, insertToFirestore, updateDoc}