export default function Card({item}){
    return(
      <>
        {item.order % 2 == 0 ? 
          <div style={{display: 'flex',  backgroundColor: item.color, padding: 30, height: 'auto'}}>
            <div id='left' style={{width: '50%', paddingLeft: 140}}>
              <img style={{height: 200, outlineStyle: 'solid', borderRadius: 20, outlineColor: 'lightgray'}} src={item.image} alt='empty...' />
            </div>
            <div id='right' style={{width: '50%', paddingRight: 140}}>
              <h1>{item.title}</h1>
              <span style={{ color: 'gray'}}>{item.desc}</span>
              <br />
              <br />
              <br />
              
            </div>
          </div>
        :
        <div style={{display: 'flex', backgroundColor: item.color, padding: 30, height: 'auto'}}>
            <div id='left' style={{width: '50%', paddingLeft: 140}}>
              <h1>{item.title}</h1>
              <span style={{ color: 'gray'}}>{item.desc}</span>
            </div>
            <div id='right' style={{width: '50%', paddingLeft: 10}} >
              <img style={{height: 200, outlineStyle: 'solid', borderRadius: 20, outlineColor: 'lightgray'}} src={item.image} alt='empty...' />
              <br />
              <br />
              <br />
              
            </div>
          </div>
      }
      </>

      

    )
}