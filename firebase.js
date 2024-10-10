import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDoc, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore/lite';
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

// Get a list of cities from your database
async function getCities(db) {
  const citySnapshot = await getDocs(collection(db, 'MyProjects'));
  const cityList = citySnapshot.docs.map(doc => {
    return { 
        id: doc.id, 
        ...doc.data(), 
    }
  });
  return cityList;
}

async function insertToFirestore(title, desc, color, order){
    try {
      const docRef = await addDoc(collection(db, 'MyProjects'), {
        title: title,
        desc: desc,
        color: color,
        order: order
      })
      console.log(docRef)
    } catch (e) {
      console.log(e)
    }
  }
  

export {db, doc, getCities, getDoc, insertToFirestore, updateDoc}