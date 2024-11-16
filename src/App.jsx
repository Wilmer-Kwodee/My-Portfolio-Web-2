import { useEffect, useRef, useState } from 'react';
import {db, getCities, updateDoc} from '../firebase';
import {doc, deleteDoc} from 'firebase/firestore/lite';
import Card from './components/Card';

function App() {
  const [notes, setNote] = useState([])
  const dragItem = useRef()
  const dragOverItem = useRef()

  useEffect(() => {
    getCities(db).then(setNote);  // Resolve promise and set the result to state
  }, [notes]);

  async function handleUpdate(item){
    window.location.href = '/update/' + item.id
  }

  async function handleDelete(id){
    await deleteDoc(doc(db, 'MyProjects', id))
    alert('success')
    window.location.href = '/'
  }

  async function handleOrderChangeDB(){
    const currentID = notes[dragItem.current].id;
    const targetID = notes[dragOverItem.current].id;
    
    console.log("curr:" + dragItem.current + "-" + currentID)
    console.log("target:" + dragOverItem.current + "-" + targetID)
    
    const currRef = doc(db, 'MyProjects', currentID)
    await updateDoc(currRef, { order: dragOverItem.current })
    const targetRef = doc(db, 'MyProjects', targetID)
    await updateDoc(targetRef, { order: dragItem.current })
  }

  const dragStart = (e) => {
    dragItem.current = e;
  }
  const dragEnter = (e) => {
    dragOverItem.current = e;
  }
  const drop = async () => {
    const copyArray = [...notes]
    const dragItemContent = copyArray[dragItem.current]
    
    copyArray.splice(dragItem.current, 1)
    copyArray.splice(dragOverItem.current, 0, dragItemContent)
    
    await handleOrderChangeDB()
    dragItem.current = null
    dragOverItem.current = null
    setNote(copyArray)
  }

  return (
    <div style={{fontFamily: 'arial'}}>

      <div id='section-01' style={{padding: 60, paddingLeft: 80}}>
        <h1 style={{fontSize: 60}}>Wilmer's <br/>Journey of Life</h1>
        <a href='/insert' style={{backgroundColor: 'lightblue', padding: 20, borderRadius: 100, textDecoration: 'none', fontSize: 30}}>+</a>
      </div>

      <hr />
      
      <table>
      <tbody>
      {notes ? <></> : <h1>loading...</h1>}
        {notes
        .map( (item, i) => {
          return(
            <tr 
              key={i}
              onDragStart={() => dragStart(i)}
              onDragEnter={() => dragEnter(i)}
              onDragEnd={drop}
              draggable 
              >
              <td>

              <div style={{display: 'flex', backgroundColor: item.color, padding: 30, height: 'auto'}}>
                <div id='left' style={{width: '50%', paddingLeft: 140}}>
                <svg width="50px" height="50px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" clipRule="evenodd" d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z" fill="#121923"/>
                </svg>
                  <img style={{height: 200, outlineStyle: 'solid', borderRadius: 20, outlineColor: 'lightgray'}} src={item.image} alt='empty...' />
                </div>
                <div id='right' style={{width: '50%', paddingRight: 130}}>
                  <span>{item.order}</span>
                  <h1>{item.title}</h1>
                  <span>{item.desc}</span>
                  <br />
                  <br />
                  <br />
                  <button onClick={() => handleUpdate(item)}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 64 64">
<path d="M22 51c-1-1-4-1-4-1l-.425-1.274c-.362-1.086-1.215-1.939-2.301-2.301L14 46c0 0 .5-2.5-1-4l25-25 8 10L22 51zM52 21l-9-9 4.68-4.68c0 0 3.5-1.5 7 2s2 7 2 7L52 21zM9 50l-1.843 4.476c-.614 1.49.877 2.981 2.367 2.367L14 55 9 50z"></path>
</svg>
                    </button>
                  <button onClick={() => handleDelete(item.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 30 30">
    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
</svg>
                  </button>
                </div>
              </div>
              <hr/>

              </td>
            </tr>
            // <Card item={item}/>
          );
        }
        )}
      </tbody>
    </table>

    </div>
  );
}

export default App;