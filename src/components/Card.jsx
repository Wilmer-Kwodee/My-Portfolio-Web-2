export default function Card({item}){
    return(
        <div key={item.id}>

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
                  <button onClick={() => handleDelete(item.id)}>delete</button>
                  <a> _ </a>
                  <button onClick={() => {}}>^</button>
                  <button onClick={() => {}}>v</button>
                </div>
              </div>
              <hr/>
              
        </div>
    )
}