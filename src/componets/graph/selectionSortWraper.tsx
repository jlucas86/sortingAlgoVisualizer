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

function selectionSortWraper(props:{playRef:any}) {

    const ogData = useContext(dataContext)

    const [data, setData] = useState<Array<Number>>([...ogData.dataSet])
    const [step, setSteps] = useState<number>(0)

    var name:string = "S"

    useImperativeHandle(props.playRef, () => ({

        click(func:number){
            if(func === 0){
                selectionSortPlay()
            } else if( func === 1){
                selectionSortClick()
            }
        }
      }));

    // effect to update data when ogData is modied
    useEffect(()=>{
        setData([...ogData.dataSet])
    },[ogData])


    useEffect(() =>{
        console.log("select sort init ran");

        // set color of bars to grey
        for( let x = 0; x <data.length; x++){
            if(document.getElementById("bar"+(x).toString()+name))
                document.getElementById("bar"+(x).toString()+name).style.backgroundColor = "grey"
        }
        
        window.localStorage.setItem("sI", String(0))
        window.localStorage.setItem("sJ", String(1))
        window.localStorage.setItem("sSmallest", String(0))

        window.localStorage.setItem("sWorking", String(0))
        window.localStorage.setItem("sFinished", String(0))

        window.localStorage.setItem(name+ "steps", String(0))
        setSteps(0)
    },[data.length, ogData])

    //one click (play)
    const selectionSortPlay = () =>{
        let finished:Number = Number(window.localStorage.getItem("sFinished"))

        while(finished === 0){
            selectionSortClick()
            finished = Number(window.localStorage.getItem("sFinished"))
        }
    }

    // step through
    const selectionSortClick = () =>{
        let i:number = Number(window.localStorage.getItem("sI"))
        let j:number = Number(window.localStorage.getItem("sJ"))
        let smallest:number = Number(window.localStorage.getItem("sSmallest"))

        let working:Number = Number(window.localStorage.getItem("sWorking"))
        let finished:Number = Number(window.localStorage.getItem("sFinished"))

        let hold:string = ""

        if(i === data.length)
            window.localStorage.setItem("sFinished", String(1))
        
        if(finished !== 0)
            return

        

        let steps:number = Number(window.localStorage.getItem(name+ "steps"))
        window.localStorage.setItem(name+ "steps", String(steps+1))
        setSteps(steps+1)

        // set color of bars to grey
        for( let x:number = 0; x < data.length; x++){
            
            document.getElementById("bar"+(x).toString()+name).style.backgroundColor = "grey" 
        }
        
        if(working === 0){
            // initiate a new set
            if(finished !== 0)
                return
            
            smallest = i
            j = i+1
            working = 1

            document.getElementById("bar"+(smallest).toString()+name).style.backgroundColor = "blue"
            if(j<data.length)
                document.getElementById("bar"+(j).toString()+name).style.backgroundColor = "green"

            // window.localStorage.setItem("sWorking")
            window.localStorage.setItem("sJ", String(j))
            window.localStorage.setItem("sSmallest", String(smallest))

            window.localStorage.setItem("sWorking", String(1))
            

        } else{
            // call helper function to got through next set
            selectionSortHelper(i, j, smallest)
        }

    }

    const selectionSortHelper = (i:number, j:number, smallest:number) =>{

        if(data[j]<data[smallest]){
            smallest = j   
        }
        j++
        if(j>=data.length){
            //swap
            let hold = data[i]
            data[i] = data[smallest]
            data[smallest] = hold
            i++
            window.localStorage.setItem("sI", String(i))
            window.localStorage.setItem("sWorking", String(0))
            setData([...data])
        }
        window.localStorage.setItem("sJ", String(j))
        window.localStorage.setItem("sSmallest", String(smallest))
        document.getElementById("bar"+(smallest).toString()+name).style.backgroundColor = "blue"
        if(j<data.length)
            document.getElementById("bar"+(j).toString()+name).style.backgroundColor = "green"

        
        
        
    }

    // fix one click version


    // one click
    const selectionSort = () =>{

        console.log("play", data.length);
        for(let i = 0; i<data.length; i++){
            let smallest = i
            for(let j = i+1; j< data.length; j++){
                // compare index j to smallet val 
                if(data[j]<data[smallest]){
                    smallest = j
                }
            }
            
            //swap
            let hold = data[i]
            data[i] = data[smallest]
            data[smallest] = hold

        }
        setData([...data])
    }




    return(
        <div className="  bg-zinc-700 px-2 border-2 rounded-md border-black w-full  "  id="insertionSortWraper">
            <div className="flex">
                <h3 className="flex-1">Selection Sort</h3>
                <h4>Steps:{step}</h4>
            </div>
            <Graph data={data} parent={name}></Graph>
            <div id="insertionSortWraperButtons">
                <button onClick={selectionSortPlay}>play</button>
                <button onClick={selectionSortClick}>step</button>
            </div>
        </div>
    )
}

export default selectionSortWraper