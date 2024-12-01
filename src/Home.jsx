import React, { useEffect, useState } from 'react';
import { db, getCities } from '../firebase';
import Card from './components/Card';
import './HomeStyle.css';

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
    <div style={{fontFamily: 'Arial, Helvetica'}}>

    <div class="home-section-1">
      <div className="home-section-1__title absolute right-36 top-24" >
        <h1 className='text-white text-7xl font-bold italic  animate-pulse' >Wilmer <br/> Kwodeevan</h1>
        <p className='text-white font-bold text-lg pt-5' style={{letterSpacing: '0.4rem'}}>SOFTWARE ENGINEER</p>
      </div>
      <div className="home-section-1__description">
      </div>
    </div>      

    <div className="home-section-2 p-0">
      <svg style={{paddingTop: 10}} width="720" height="720" id="epTRrF31g6v1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" project-id="d4a4c2491da2459ca47f031e2f5118dd" export-id="78b58f3aea5f477d99f1bd2cd27332b9" cached="false"><path d="" transform="translate(0 0.000002)" fill="none" stroke="#3f5787" strokeWidth="0.6"/><path d="" fill="none" stroke="#3f5787" strokeWidth="0.6"/><path d="M163.463989,0c0,7.96221,20.851434,23.979149-55.256299,55.777585-123.48287,51.592157,3.737233,87.180636,32.319722,90.18245c114.161599,11.989574,162.69849,65.322632,76.391198,83.515024C64.759731,261.548061,99.461665,294.935528,99.461665,300" transform="translate(-13.463989 0)" fill="none" stroke="#757575" strokeWidth="16"/><path d="" fill="none" stroke="#3f5787" strokeWidth="0.6"/><path d="" fill="none" stroke="#3f5787" strokeWidth="0.6"/><path d="" fill="none" stroke="#3f5787" strokeWidth="0.6"/><path d="" fill="none" stroke="#3f5787" strokeWidth="0.6"/></svg>
      <h1 className="home-section-2__text-1 text-7xl font-bold italic absolute right-24 top-24 animate-pulse">My Journey</h1>
      <h1 className="home-section-2__text-2 text-7xl font-bold italic absolute left-24 bottom-24 animate-pulse">With Code</h1>
    </div>
    
    <div className="home-section-3">
      <h1 style={{letterSpacing: '0.4rem'}} className="home-section-3__title text-white text-3xl font-bold text-center pt-52 animate-pulse">STARTS HERE</h1>
    </div>

    {/* style={{ paddingTop: 100, paddingBottom: 100}} */}
    <div className="home-section-4" >
      {notes ? <></> : <h1>loading...</h1>}
        {notes.map( (item, i) => {
          return(
            <Card item={item} key={i}/>
          );
        }
        )}
    </div>

    <div className='footer-collaborate mb-60'>
      <p className='footer-collaborate__title text-center text-5xl font-bold animate-pulse'>
        Let's Collaborate! 👋
      </p>
      <div className="footer-collaborate__links flex gap-10 justify-center m-10">
        <a href='https://github.com/Wilmer-Kwodee' className='hover:animate-bounce'>
          <img src='/Octicons-mark-github.svg' className='w-20' />
        </a>
        <a href='https://www.linkedin.com/in/wilmer-kwodeevan-5a4659248/' className='hover:animate-bounce'>
          <img src='/LinkedIn_icon.svg' className='w-20' />
        </a>
        <a href='mailto:wilmer.kwodeevan@binus.ac.id' className='hover:animate-bounce'>
          <img src='/Email-Icon-SVG.svg' className='w-20' />
        </a>
      </div>
    </div>

    <div style={{    
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        textAlign: 'center',
        padding: '20px',
    }}>
      <a href='/temp' style={{    textDecoration: 'none',    color: 'gray',
      }}>Made with ♡ by Wilmer Kwodeevan</a>
    </div>

    </div>
  )
}
