import { useEffect, useState } from 'react';
import {db, getCities, updateDoc} from '../firebase';
import {doc, deleteDoc} from 'firebase/firestore/lite';
import Card from './components/Card';

function App() {
  const [notes, setNote] = useState([])

  useEffect(() => {
    getCities(db).then(setNote);  // Resolve promise and set the result to state
  }, []);

  async function handleUpdate(item){
    window.location.href = '/update/' + item.id
  }

  async function handleDelete(id){
    await deleteDoc(doc(db, 'MyProjects', id))
    alert('success')
    window.location.href = '/'
  }
  
  async function handleOrderUp(item){
    const docRef = doc(db, 'MyProjects', item.id)
    await updateDoc(docRef, { order: item.order - 1 })
    window.location.href = '/'
  }
  async function handleOrderDown(item){
    const docRef = doc(db, 'MyProjects', item.id)
    await updateDoc(docRef, { order: item.order + 1 })
    window.location.href = '/'
  }

  return (
    <div style={{fontFamily: 'arial'}}>
      <div id='section-01' style={{padding: 60, paddingLeft: 80}}>
        <h1 style={{fontSize: 60}}>Wilmer's <br/>Journey of Life</h1>
        <a href='/insert'>insert new</a>
      </div>

      <hr />
      
      <div id="container-boxes">
        {notes
        .sort( (a,b) => a.order - b.order)
        .map( (item) => {
          return(

            <div key={item.id}>
              <div style={{display: 'flex', backgroundColor: item.color, padding: 30, height: 200}}>
                <div id='left' style={{width: '50%', paddingLeft: 100}}>
                  {/* <div id='img-frame' style={{backgroundColor: 'lightgray', width: 500, height: 200, borderRadius: 20}} /> */}
                  <img style={{width: 500, height: 200, outlineStyle: 'solid', borderRadius: 20}} src={item.image} alt='empty...' />
                </div>
                <div id='right' style={{width: '50%'}}>
                  <span>{item.order}</span>
                  <h1>{item.title} : </h1>
                  <span>{item.desc}</span>
                  <br />
                  <br />
                  <br />
                  <button onClick={() => handleUpdate(item)}>update</button>
                  <button onClick={() => handleDelete(item.id)}>delete</button>
                  <a> _ </a>
                  <button onClick={() => {handleOrderUp(item)}}>^</button>
                  <button onClick={() => {handleOrderDown(item)}}>v</button>
                </div>
              </div>
              <hr/>
            </div>
            // <Card item={item}/>
          );
        }
        )}
      </div>
    </div>
  );
}

export default App;