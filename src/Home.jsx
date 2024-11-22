import React, { useEffect, useState } from 'react';
import './HomeStyle.css';
import { db, getCities } from '../firebase';
import Card from './components/Card';

export default function Home() {
  const [notes, setNotes] = useState([]);

  async function fetchNotes(){
    const temp = await getCities(db);
    setNotes(temp);
  }

  useEffect(() => {
      fetchNotes();
  }, []);

  return (
    <>
    <div class="home-section-1">
      <div class="home-section-1__title">
        <h1 >Wilmer <br/> Kwodeevan</h1>
      </div>
    </div>      

    <div class="home-section-2">
      <svg style={{paddingTop: 21}} width="720" height="720" id="epTRrF31g6v1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" project-id="d4a4c2491da2459ca47f031e2f5118dd" export-id="78b58f3aea5f477d99f1bd2cd27332b9" cached="false"><path d="" transform="translate(0 0.000002)" fill="none" stroke="#3f5787" strokeWidth="0.6"/><path d="" fill="none" stroke="#3f5787" strokeWidth="0.6"/><path d="M163.463989,0c0,7.96221,20.851434,23.979149-55.256299,55.777585-123.48287,51.592157,3.737233,87.180636,32.319722,90.18245c114.161599,11.989574,162.69849,65.322632,76.391198,83.515024C64.759731,261.548061,99.461665,294.935528,99.461665,300" transform="translate(-13.463989 0)" fill="none" stroke="#757575" strokeWidth="16"/><path d="" fill="none" stroke="#3f5787" strokeWidth="0.6"/><path d="" fill="none" stroke="#3f5787" strokeWidth="0.6"/><path d="" fill="none" stroke="#3f5787" strokeWidth="0.6"/><path d="" fill="none" stroke="#3f5787" strokeWidth="0.6"/></svg>
      <h1 class="home-section-2__text-1">My Journey</h1>
      <h1 class="home-section-2__text-2">With Code</h1>
    </div>
    
    <div class="home-section-3">
      <h1 class="home-section-3__title">STARTS HERE</h1>
    </div>

    <div className="home-section-4" style={{ paddingTop: 100, paddingBottom: 100}}>
      {notes ? <></> : <h1>loading...</h1>}
        {notes.map( (item) => {
          return(
            <Card item={item}/>
          );
        }
        )}
    </div>
    </>
  )
}
