import { useState, useEffect, useContext } from "react";

import DataNode from "../items/dataNode";

import { dataContext } from "../../contexts/dataContext";

function DataEditor(){

    const data = useContext(dataContext)

    const [display, setDisplay] = useState(true)
    const [style, setStyle] = useState({display:"block"})

    const handleChange = () =>{
        if (display) {
            setDisplay(false)
            setStyle({display:"none"})
            
        }else {
            setDisplay(true)
            setStyle({display:"block"})
        }
    }
    return (
        <div className="border-2 border-black rounded bg-zinc-800">
            <div className="flex">
                <h2 className="flex-1 ml-4 font-bold">Values</h2>
                <button className=" font-bold mr-6 px-1 text-xl" onClick={handleChange} >−</button>
            </div>
            
            <div style={style} className="overflow-y-scroll max-h-[50vh]">
                {data.dataSet.length > 0 ?
                    <div>
                        {data.dataSet.map((val:number, index:number)=>(
                            <DataNode val={val} index={index}></DataNode>
                        ))}
                    </div> :
                    <div className="hidden"> 
                        empty
                    </div>
                }
            </div>
        </div>
    )
}

export default DataEditor