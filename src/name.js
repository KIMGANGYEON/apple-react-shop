import {useState, useTransition} from "react";

let a = new Array(10000).fill(0)

function App(){
    let [name, setName] = useState('')
    let [isPending, startTransition] = 

    return(
        <div className="App">
            <input onChange={(e) => {setName(e.target.value )}}/>
        {
            a.mpa(()=>{
                return <div>{name}</div>
            })
        }
        </div>
    )
}

export default App;