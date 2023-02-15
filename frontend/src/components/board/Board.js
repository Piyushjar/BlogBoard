import Canvas from "./Canvas";
import "./Canvas.css";
export default function Board({_id}) {
    const id = _id
    return (
 
  
            <div 
            //style={{position:"relative", height:450, width:700}}
            >
                <Canvas _id={id}/>
            </div>
    
    )
}