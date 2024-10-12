import { useEffect, useRef, useState } from "react"
import { db, doc, getDoc, storage, updateDoc } from "../firebase"
import { useParams } from "react-router-dom"
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';

export default function(){
    const { id } = useParams()
    const [item, setItem] = useState()
    const [itemTitle, setItemTitle] = useState()
    const [itemDesc, setItemDesc] = useState()
    const [itemColor, setItemColor] = useState()
    const [itemImage, setItemImage] = useState()
    const [itemImagePath, setItemImagePath] = useState()

    const inputTitleRef = useRef(null)
    const h1TitleRef = useRef(null)

    useEffect(() => {
        async function biarBisaPakeAwait() {
            const docRef = doc(db, 'MyProjects', id)
            const docSnap = await getDoc(docRef)
            const docData = docSnap.data()
            console.log(docData)

            setItem(docData)
            setItemTitle(docData.title)
            setItemDesc(docData.desc)
            setItemColor(docData.color)
        }

        biarBisaPakeAwait()
    }, [])

    async function handleUpdate() {
        try {
            // Wait for the file to upload and get the URL
            const imageUrl = await uploadFile();
            const docRef = doc(db, 'MyProjects', id);
    
            if(itemImage == null){
                await updateDoc(docRef, {
                    title: itemTitle, desc: itemDesc, color: itemColor,
                });
            }
            else{
                // Once the URL is available, update the Firestore document
                await updateDoc(docRef, {
                    title: itemTitle,
                    desc: itemDesc,
                    color: itemColor,
                    image: imageUrl, // Use the URL obtained from uploadFile
                });
            }
    
            alert('Success');
            window.location.href = '/';
        } catch (error) {
            console.error('Error updating document:', error.message);
        }
    }
    
    function uploadFile() {
        if(itemImage == null){
            return;
        }

        return new Promise((resolve, reject) => {
            const imageRef = storageRef(storage, `Project Images/${id}/img`);
            
            uploadBytes(imageRef, itemImage)
                .then(snapshot => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            // Resolve the promise with the URL
                            setItemImagePath(url);
                            resolve(url);
                        })
                        .catch(error => {
                            console.error('Error getting download URL:', error.message);
                            reject(error);
                        });
                })
                .catch(error => {
                    console.error('Error uploading file:', error.message);
                    reject(error);
                });
        });
    }
    
    function handleTitleClick(){
        inputTitleRef.current.style.display = 'block'
        inputTitleRef.current.focus()
        h1TitleRef.current.style.display = 'none'
    }

    return(
        <>
        {item ? 
            <div style={{fontFamily: 'arial'}}>
                <div style={{display: 'flex', backgroundColor: itemColor, padding: 30, height: 200}}>
                <div id='left' style={{width: '50%', paddingLeft: 140}}>
                    {/* <div id='img-frame' style={{backgroundColor: 'lightgray', width: 500, height: 200, borderRadius: 20}} /> */}
                    <img style={{height: 200, outlineStyle: 'solid', borderRadius: 20, outlineColor: 'lightgray'}} src={item.image} alt='empty...' />
                </div>
                <div id='right' style={{width: '50%', paddingRight: 130}}>
                    <input value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} ref={inputTitleRef} style={{display: 'none', fontSize: 32, fontWeight: 700, marginTop: 10, marginBottom: 20, backgroundColor: itemColor, outlineStyle: 'none'}}/>
                    <h1 onClick={handleTitleClick} ref={h1TitleRef}>{itemTitle}</h1>
                    
                    <textarea value={itemDesc} onChange={e => setItemDesc(e.target.value)} style={{width: '100%'}}/><br/>
                    <span>{itemDesc}</span>
                    
                    <input style={{marginTop: 20}} value={itemColor} onChange={(e) => setItemColor(e.target.value)}/><br/>
                    <br/>
                    <input type="file" accept="image/*" onChange={e => setItemImage(e.target.files[0])}/>
                    <br />
                    <br />
                    <br />
                    <button>update</button>
                    <button>delete</button>
                    <a> _ </a>
                    <button>^</button>
                    <button>v</button>
                    <a> ________________________________ </a>
                    <button onClick={() => {handleUpdate()}} style={{fontSize: 35}}>Submit</button>
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

// real wilmer code:
/*

async function handleUpdate(){
        uploadFile();
        const docRef = doc(db, 'MyProjects', id)
        await updateDoc(docRef, {
            title: itemTitle,
            desc: itemDesc,
            color: itemColor,
            image: itemImagePath
        })

        alert('sukses')
        window.location.href = '/'
    }

    function uploadFile(){
        const imageRef = storageRef(storage, Project Images/${id}/img)
        uploadBytes(imageRef, itemImage)
            .then( (snapshot) => { 
                getDownloadURL(snapshot.ref)
                .then((url) => { 
                    saveData(url)
                    setItemImagePath(url)
                    console.log(url)
                }).catch(e => console.log(e.message))
                }       
            )
    }

*/