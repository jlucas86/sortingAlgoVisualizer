import {useState} from "react"

import AlgorithmMenu from "../submenu/algorithMenu"
import DataMenu from "../submenu/dataMenu"

function dropDownMenu( props:{dataSet:Array<number>, setDataSet:Function}){

    const [display, setDisplay] = useState(true)
    const [style, setStyle] = useState({display:"block"})

    const handleChange = () =>{
        if (display) {
            setDisplay(false)
            setStyle({display:"none", height:"0%"})
            
        }else {
            setDisplay(true)
            setStyle({display:"block"})
        }
    }


    return (
        <div className="lg:w-52 px-2 bg-zinc-800 max-h-[50vh] border-2 rounded-md border-black my-2">
            <div className="flex">
                <h2 className="flex-1">Menu</h2>
                <button className=" font-bold mr-4 px-1 text-xl" onClick={handleChange} >−</button>
            </div>
            <div style={style}>
                <AlgorithmMenu/>
                <DataMenu dataSet ={props.dataSet} setDataSet={props.setDataSet}/>
                {/* <div className="text-center" >
                    <button> buttons</button>
                </div> */}
            </div>
        </div>
    )
}

export default dropDownMenu