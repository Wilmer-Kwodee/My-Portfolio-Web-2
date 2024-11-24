import './CardStyle (temporary).css'

export default function Card({item}){
    return(
      <a href={'/detail/' + item.id} style={{ textDecoration: 'none', color: 'black'}}>
        {item.order % 2 == 0 ? 
          <div className='card' style={{display: 'flex', padding: 30, height: 'auto'}}>
            <div id='left' style={{width: '50%', paddingLeft: 140}}>
              <img style={{height: 200, outlineStyle: 'solid', borderRadius: 20, outlineColor: 'lightgray'}} src={item.image} alt='empty...' />
            </div>
            <div id='right' style={{width: '50%', paddingRight: 140}}>
              <h1>{item.title}</h1>
              <span style={{ color: 'gray', whiteSpace: 'pre-wrap', maxWidth: 10}}>{item.desc.slice(0, 150)}...</span>
              <br />
              <br />
              <br />
              
            </div>
          </div>
        :
        <div className='card' style={{display: 'flex', padding: 30, height: 'auto'}}>
            <div id='left' style={{width: '50%', paddingLeft: 140}}>
              <h1>{item.title}</h1>
              <span style={{ color: 'gray', whiteSpace: 'pre-wrap'}}>{item.desc.slice(0, 150)}...</span>
            </div>
            <div id='right' style={{width: '50%', paddingLeft: 10}} >
              <img style={{height: 200, outlineStyle: 'solid', borderRadius: 20, outlineColor: 'lightgray'}} src={item.image} alt='empty...' />
              <br />
              <br />
              <br />
              
            </div>
          </div>
      }
      </a>

      

    )
}