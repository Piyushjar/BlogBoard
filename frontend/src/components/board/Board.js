import Canvas from "./Canvas";
import "./Canvas.css";
export default function Board({id}) {
    const _id = id
    return (
 
  
            <div style={{height:10}}>
                  <h1>{_id}</h1>
                <Canvas id={id}/>
            </div>
    
    )
}