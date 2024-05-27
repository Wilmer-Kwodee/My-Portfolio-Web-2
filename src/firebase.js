// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, doc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpTL2ecFwJV_UCQ5Yf7v2sl-onXJGX27s",
  authDomain: "wilmer-portfolio-web.firebaseapp.com",
  projectId: "wilmer-portfolio-web",
  storageBucket: "wilmer-portfolio-web.appspot.com",
  messagingSenderId: "997051434145",
  appId: "1:997051434145:web:894f21f13fa81542b95ce0",
  measurementId: "G-G4NHBQEGN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};
// const analytics = getAnalytics(app);

// addDoc(collection(db, 'users'), {
//     name: "wilmer",
//     country: "canada"
// })


const docRef = doc(db, "users", "nRv9oA9ERkJ3pML1B8zQ");
// const docSnap = await getDoc(docRef);
// console.log(docSnap.data())

