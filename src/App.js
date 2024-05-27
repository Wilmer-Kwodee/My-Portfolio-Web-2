import logo from './logo.svg';
import './App.css';
import './firebase';
import { db } from './firebase';
import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "users", "nRv9oA9ERkJ3pML1B8zQ");
const docSnap = await getDoc(docRef);
const country = docSnap.data().country; 
const name = docSnap.data().name;
// alert(docSnap.data())

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          halo, i have just made some changes yo..
        </p>
        <p>{name}, {country}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

