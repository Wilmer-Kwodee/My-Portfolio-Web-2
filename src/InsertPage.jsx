import { useState } from 'react';
import { insertToFirestore } from '../firebase';

export default function InsertPage(){  
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [color, setColor] = useState('')
  
    async function handleSubmit(e){
      e.preventDefault()
      await insertToFirestore(title, desc, color, 0)
      window.location.href = '/'
    }  

    return(
        <div style={{fontFamily: 'arial', padding: 50}}>
            <h1 style={{fontSize: 50}}>Write new chapter</h1>

            <form className="input-box" onSubmit={handleSubmit} style={{width:'50%'}}>
              <div>
                  <span>Title: </span>
                  <input placeholder='insert title here....' value={title} onChange={e => setTitle(e.target.value)}/>
              </div>
              <div style={{display:'flex', alignItems: 'space-between'}}>
                  <span>Description: </span>
                  <textarea placeholder='insert description here....' value={desc} onChange={e => setDesc(e.target.value)} style={{height: 50}}/>
              </div>
              <div>
                <span>Choose color: </span>
                <input placeholder='enter color code here...' value={color} onChange={e => setColor(e.target.value)} />
              </div>
              <br/>
              <button style={{width: 100, height: 50, borderRadius: 10}}>Insert!</button>
            </form>
        </div>
    )
}
