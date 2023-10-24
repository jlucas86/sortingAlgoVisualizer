
import { useState, useEffect, useContext, useImperativeHandle } from "react";



import Graph from "./graph.tsx"


// context
import { dataContext } from "../../contexts/dataContext";


/**
 * componet that will display a graph contating data from the data context and
 * buttons to allow the user to sort the array.
 *      - play button will sort the array in one go with some sort of delay between steps
 *      - next step buttion will do the next step in sorting the array
 * 
 */

function bubbleSortWrapper(props:{playRef:any}) {

    const ogData = useContext(dataContext)

    const [data, setData] = useState([...ogData.dataSet])
    const [step, setSteps] = useState<number>(0)

    const name:string = "B"

    // effect to update data when ogData is modied
    useEffect(()=>{
        setData([...ogData.dataSet])
    },[ogData])


    useImperativeHandle(props.playRef, () => ({

        click(func:number){
            if(func === 0){
                bubbleSortPLay()
            } else if( func === 1){
                bubbleSortClick()
            }
        }
      }));


    useEffect(() =>{

        // set color of bars to grey
        for( let x = 0; x <data.length; x++){
            if(document.getElementById("bar"+(x).toString()+name))
                document.getElementById("bar"+(x).toString()+name).style.backgroundColor = "grey"
        }
        window.localStorage.setItem(name+'index1',  String(data.length -1))
        window.localStorage.setItem(name+'index2',  String(0))
        window.localStorage.setItem(name+'next', false)
        window.localStorage.setItem(name+'finish', false)
        window.localStorage.setItem(name+"finished", String(0))
        window.localStorage.setItem(name+ "steps", String(0))
        setSteps(0)
    },[data.length, ogData])

    const bubbleSortPLay = () =>{
        let finished:number = Number(window.localStorage.getItem(name+"finished"))
        while(finished === 0){
            bubbleSortClick()
            finished = Number(window.localStorage.getItem(name+"finished"))
        }
    }

    // step through
    const bubbleSortClick = () =>{

        let index1 = Number(window.localStorage.getItem(name+"index1"))
        let index2:number = Number(window.localStorage.getItem(name+"index2"))
        let next = window.localStorage.getItem(name+"next")

        let finished:number = Number(window.localStorage.getItem(name+"finished"))
        if(finished !== 0)
            return
        
        let steps:number = Number(window.localStorage.getItem(name+ "steps"))
        window.localStorage.setItem(name+ "steps", String(steps+1))
        setSteps(steps+1)

        // set color of bars to grey
        for( let x = 0; x <index1; x++){
            document.getElementById("bar"+(x).toString()+name).style.backgroundColor = "grey"
        }

        if(index2 < data.length){
            
            if(next == 'false')
                bubbleOuter()
            else
                bubbleInner()
        }
    }

    // bubble sort brokend down by parts 

    const bubbleOuter = () =>{

        
        let index1 = Number(window.localStorage.getItem(name+"index1"))

        console.log("outer")
        if(index1 > 0){
            window.localStorage.setItem(name+'index2',  String(0))
            // index2 = 0
            bubbleInner()

        }
        else{
            // finished sorting
            window.localStorage.setItem(name+"finished", String(1))
            console.log("finished")
            document.getElementById("bar"+(index1).toString()+name).style.backgroundColor = "green"
        }
    }

    const bubbleInner = () =>{

        let index2 = Number(window.localStorage.getItem(name+"index2"))
        let index1 = Number(window.localStorage.getItem(name+"index1"))
        let next = window.localStorage.getItem(name+"next")
        console.log("inner", "bar"+(index2+1))

        if(index2 < index1 ){
            window.localStorage.setItem(name+'next', true)
            //next = true
            
            
            // setTimeout(() => {
                if(data[index2]> data[index2+1]){
                    let hold = data[index2]
                    data[index2] = data[index2+1]
                    data[index2+1] = hold
                    setData([...data])
                    console.log("index: ", data[index2], ", index+1: ", data[index2+1])
                }
                window.localStorage.setItem(name+'index2', String(index2+1))
                // index2++
            // }, 1000);
            document.getElementById("bar"+(index2).toString()+name).style.backgroundColor = "blue";
            document.getElementById("bar"+(index2+1).toString()+name).style.backgroundColor = "red";
            
        }
        else{
            console.log("set to false")
            window.localStorage.setItem(name+'next', false)
            window.localStorage.setItem(name+'index1', String(index1-1))
            // next = false
            // index1--
            document.getElementById("bar"+(index1).toString()+name).style.backgroundColor = "green"
        }
        
    }
     


    




    return(
        <div className=" bg-zinc-700 px-2 border-2 rounded-md border-black w-full  " id="bubbleSortWrapper">
            
            <div className="flex">
                <h3 className="flex-1">Bubble Sort</h3>
                <h4>Steps:{step}</h4>
            </div>
            <Graph data={data} parent={name}></Graph>
            <div id="insertionSortWraperButtons">
                <button onClick={bubbleSortPLay}>play</button>
                <button onClick={bubbleSortClick}>step</button>
            </div>
        </div>
    )
}

export default bubbleSortWrapper