import { useEffect, useRef, useState } from "react"
import { db, doc, getDoc, insertToFirestore, storage, updateDoc } from "../firebase"
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from "firebase/firestore/lite";

export default function InsertForm() {
    const [itemTitle, setItemTitle] = useState('Enter Title Here...')
    const [itemDesc, setItemDesc] = useState('Enter desc here...')
    const [itemColor, setItemColor] = useState('whitesmoke')
    const [itemImage, setItemImage] = useState()
    const [itemImagePath, setItemImagePath] = useState()

    const inputTitleRef = useRef(null)
    const h1TitleRef = useRef(null)

    async function handleUpdate() {
        if (itemImage == null) {
            alert('oi image empty');
            return;
        }
    
        try {
            const docRef = await addDoc(collection(db, 'MyProjects'), {
                title: itemTitle,
                desc: itemDesc,
                color: itemColor,
                image: '',
                order: 0
            });
    
            const id = docRef.id;
            const imageUrl = await uploadFile(id);
    
            await updateDoc(docRef, {
                image: imageUrl
            });
    
            alert('Success');
            window.location.href = '/';
        } catch (error) {
            console.error('Error inserting/updating document:', error.message);
        }
    }
    
    function uploadFile(id) {
        if (itemImage == null) {
            return Promise.reject('No image selected');
        }
    
        return new Promise((resolve, reject) => {
            const imageRef = storageRef(storage, `Project Images/${id}/img`);
            
            uploadBytes(imageRef, itemImage)
                .then(snapshot => getDownloadURL(snapshot.ref))
                .then(url => {
                    setItemImagePath(url);
                    resolve(url);
                })
                .catch(error => {
                    console.error('Error uploading file:', error.message);
                    reject(error);
                });
        });
    }
    
    function handleTitleClick() {
        inputTitleRef.current.classList.remove('hidden');
        inputTitleRef.current.focus();
        h1TitleRef.current.classList.add('hidden');
    }

    return (
        <div className="font-sans">
            <h1 className="text-5xl mb-8">Write new chapter</h1>
            
            <div className="flex p-8 h-52" style={{ backgroundColor: itemColor }}>
                <div className="w-1/2 pl-36">
                    <img 
                        src="" 
                        alt="empty..." 
                        className="h-52 rounded-lg outline outline-gray-200"
                    />
                </div>
                <div className="w-1/2 pr-32">
                    <input 
                        value={itemTitle}
                        onChange={(e) => setItemTitle(e.target.value)}
                        ref={inputTitleRef}
                        className="hidden text-3xl font-bold mt-2 mb-5 w-full bg-transparent outline-none"
                        style={{ backgroundColor: itemColor }}
                    />
                    <h1 
                        onClick={handleTitleClick}
                        ref={h1TitleRef}
                        className="text-3xl font-bold cursor-pointer"
                    >
                        {itemTitle}
                    </h1>
                    
                    <textarea 
                        value={itemDesc}
                        onChange={e => setItemDesc(e.target.value)}
                        className="w-full p-2 border rounded mb-4 resize-none"
                    />
                    <span className="block mb-4">{itemDesc}</span>
                    
                    <input 
                        value={itemColor}
                        onChange={(e) => setItemColor(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    />
                    
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={e => setItemImage(e.target.files[0])}
                        className="mb-8"
                    />
                    
                    <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            update
                        </button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                            delete
                        </button>
                        <span className="mx-2">_</span>
                        <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                            ^
                        </button>
                        <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                            v
                        </button>
                    </div>
                    
                    <div className="mt-8">
                        <button 
                            onClick={handleUpdate}
                            className="text-3xl px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <hr className="my-4" />
        </div>
    )
}