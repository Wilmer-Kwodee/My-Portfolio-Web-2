import React from 'react'
import { useEffect, useRef, useState } from "react"
import { db, doc, getDoc, storage, updateDoc } from "../firebase"
import { useParams } from "react-router-dom"
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { RotatingLines } from "react-loader-spinner";

export default function Detail() {
    const { id } = useParams()
    const [item, setItem] = useState({})
    const [itemTitle, setItemTitle] = useState()
    const [itemDesc, setItemDesc] = useState()
    const [itemColor, setItemColor] = useState()
    const [itemImage, setItemImage] = useState()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function biarBisaPakeAwait() {
            const docRef = doc(db, 'MyProjects', id)
            setLoading(true)
            const docSnap = await getDoc(docRef)
            const docData = docSnap.data()
            setItem(docData)
            setItemTitle(docData.title)
            setItemDesc(docData.desc)
            setItemColor(docData.color)
        }

        biarBisaPakeAwait()
        setLoading(false)
    }, [])


    return(
        <div>
        {!isLoading ? 
            <div style={{fontFamily: 'arial'}}>
                <div style={{display: 'flex', padding: 30, height: 'auto'}}>
                <div id='left' style={{ width: '50%', paddingLeft: 140}}>
                    <img style={{position: 'fixed', marginTop: '13rem', height: 200, outlineStyle: 'solid', borderRadius: 20, outlineColor: 'lightgray'}} src={itemImage ? URL.createObjectURL(itemImage) : item.image} alt='empty...' />
                </div>
                <div id='right' style={{width: '50%', paddingRight: 130,  paddingTop: 100}}>
                    <h1>{itemTitle}</h1>
                    <p style={{ whiteSpace: 'pre-wrap', color: 'gray', }}>{itemDesc}</p>
                    {/* <p>{itemColor}</p> */}
                </div>
                </div>
            </div>
            :
            <div>
                <RotatingLines 
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        }
        </div>
    )
}
