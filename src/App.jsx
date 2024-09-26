import { useEffect, useState } from 'react';

//-------------------------------------------------------------------

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
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
  const citiesCol = collection(db, 'MyProjects');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

//-------------------------------------------------------------------

function App() {
  const [notes, setNote] = useState([])
  useEffect(() => {
    getCities(db).then(setNote);  // Resolve promise and set the result to state
  }, []);

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    const newNote = {title: title, desc: desc}
    setNote([...notes, newNote])
  }

  return (
    <>
    <h1 style={{display: 'flex', justifyContent: 'center'}}>Wilmer's Observation of Life</h1>
    <form className="input-box" onSubmit={handleSubmit} style={{display: 'flex', justifyContent: 'center'}}>
      <div>
        <span>Title: </span>
        <input placeholder='insert title here....' value={title} onChange={e => setTitle(e.target.value)}/>
      </div>
      <div>
        <span>Description: </span>
        <input placeholder='insert description here....' value={desc} onChange={e => setDesc(e.target.value)}/>
      </div>
      <button>INSERT</button>
    </form>

    <hr />
    
    <div className="container-boxes" style={{padding: 30}}>
      {notes.map( (item) => {
        return(
          <div key={item.title}>
            <h1>{item.title} : </h1>
            <span>{item.desc}</span>
            <br />
            <br />
            <br />
          </div>
        );
      }
      )}
    </div>
  </>
  );
}

export default App;