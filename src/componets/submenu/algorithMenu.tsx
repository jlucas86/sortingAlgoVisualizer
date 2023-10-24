import{useState, useContext} from "react"

import Checkbox from "../checkbox/checkbox"

import { algoContext } from "../../contexts/algoContext";

/**
 * a list of check boxes for each potential algorithm that can be selected
 * 
 * @returns 
 */

function algorithmMenu(){

    const algo = useContext(algoContext)
    
    const [bubble,setBubble] = useState(false)
    const [quicksort,setQuicksort ] = useState(false)
    const [insertion, setInsertion] = useState(false)
    const [merge, setMerge] = useState(false)
    const [heap, setHeap] = useState(false)
    const [selection, setSelection] = useState(false)
    const [radix, setRadix] = useState(false)
    const [bucket, setBucket] = useState(false)




    return (
        <div className=" text-center border-b-2 border-t-2 border-black">
            <h3> Sorting Algorithms</h3>
            <div className=" text-left">
                {
                    algo.sortAlgos.map((val:number, i:number)=>(
                         <Checkbox algo={val.name} index={i} isChecked={val.active} handleChange={algo.setSortAlgos} />
                    ))
                }
                
                {/* <Checkbox algo={"Quicksort"} isChecked={algo.sortAlgos[1]} handleChange={setQuicksort} />
                <Checkbox algo={"Insertion"} isChecked={algo.sortAlgos[2]} handleChange={setInsertion} />
                <Checkbox algo={"Merge"} isChecked={algo.sortAlgos[3]} handleChange={setMerge} />
                <Checkbox algo={"Selection"} isChecked={algo.sortAlgos[4]} handleChange={setSelection} /> */}


                {/* <Checkbox algo={"Bubble"} isChecked={bubble} handleChange={setBubble} />
                <Checkbox algo={"Quicksort"} isChecked={quicksort} handleChange={setQuicksort} />
                <Checkbox algo={"Insertion"} isChecked={insertion} handleChange={setInsertion} />
                <Checkbox algo={"Merge"} isChecked={merge} handleChange={setMerge} />
                {/* <Checkbox algo={"Heap"} isChecked={heap} handleChange={setHeap} /> }
                <Checkbox algo={"Selection"} isChecked={selection} handleChange={setSelection} /> */}
                {/* <Checkbox algo={"Radix"} isChecked={radix} handleChange={setRadix} />
                <Checkbox algo={"Bucket"} isChecked={bucket} handleChange={setBucket} /> */}
            </div>
            
        </div>
    )
}

export default algorithmMenu