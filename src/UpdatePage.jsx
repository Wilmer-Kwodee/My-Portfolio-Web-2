import { useEffect, useState } from "react"
import { db, doc, getDoc } from "../firebase"
import { useParams } from "react-router-dom"

export default function(){
    const { id } = useParams()
    const [item, setItem] = useState()

    useEffect(() => {
        async function biarBisaPakeAwait() {
            const docRef = doc(db, 'MyProjects', id)
            const docSnap = await getDoc(docRef)
            const docData = docSnap.data()
            console.log(docData)

            setItem(docData)
        }

        biarBisaPakeAwait()
    }, [])

    async function handleUpdate(){

    }

    return(
        <>
        {item ? 
            <div>
            <div style={{display: 'flex', backgroundColor: item.color, padding: 30, height: 200}}>
            <div id='left' style={{width: '50%', paddingLeft: 100}}>
                <div id='img-frame' style={{backgroundColor: 'lightgray', width: 500, height: 200, borderRadius: 20}} />
            </div>
            <div id='right' style={{width: '50%'}}>
                <h1>{item.title} : </h1>
                <span>{item.desc}</span>
                <br />
                <br />
                <br />
                <button>update</button>
                <button>delete</button>
                <a> _ </a>
                <button>^</button>
                <button>v</button>
                <a> ____________________________________ </a>
                <button onClick={() => {handleUpdate()}}>Submit</button>
            </div>
            </div>
            <hr/>
            </div>
            :
            <h1>loading...</h1>
        }
        </>
    )
}