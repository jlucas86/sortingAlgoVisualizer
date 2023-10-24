import { useState, useEffect, useContext, useImperativeHandle } from "react";



import Graph from "./graph.tsx"


// context
import { dataContext } from "../../contexts/dataContext.ts";


/**
 * componet that will display a graph contating data from the data context and
 * buttons to allow the user to sort the array.
 *      - play button will sort the array in one go with some sort of delay between steps
 *      - next step buttion will do the next step in sorting the array
 * 
 */

function quickSortWraper(props:{playRef:any}) {

    const ogData = useContext(dataContext)

    const [data, setData] = useState<Array<Number>>([...ogData.dataSet])

    const [step, setSteps] = useState<number>(0)

    var name:string = "Q"

    useImperativeHandle(props.playRef, () => ({

        click(func:number){
            if(func === 0){
                quickSortPlay()
            } else if( func === 1){
                quickSortClick()
            }
        }
      }));

    // effect to update data when ogData is modied
    useEffect(()=>{
        setData([...ogData.dataSet])
    },[ogData])


    useEffect(() =>{
        console.log("quick sort init run");

        
        // set color of bars to grey
        for( let x = 0; x <data.length; x++){
            if(document.getElementById("bar"+(x).toString()+name))
                document.getElementById("bar"+(x).toString()+name).style.backgroundColor = "grey"
        }
        
        
        window.localStorage.setItem(name +"lIndex", String(data.length))
        window.localStorage.setItem(name +"rIndex", String(data.length-2))
        window.localStorage.setItem(name+ "pivot", String(data.length-1))

        window.localStorage.setItem(name+ "working", String(0))
        window.localStorage.setItem(name+ "finished", String(0))

        window.localStorage.setItem(name+ "steps", String(0))
        setSteps(0)

        let completed:Array<number> = []

        for(let i:number = 0; i < data.length; i++){
            completed[i] = 0
        }

        window.localStorage.setItem(name+ "completed", JSON.stringify(completed))
    },[data.length, ogData])

    //on click (play)
    const quickSortPlay = () =>{
        let finished:number = Number(window.localStorage.getItem(name+'finished'))
        while (finished === 0){
            quickSortClick()
            finished = Number(window.localStorage.getItem(name+'finished'))
        }
    }

    // step through
    const quickSortClick = () =>{
        let lIndex:number = Number(window.localStorage.getItem(name+'lIndex'))
        let rIndex:number = Number(window.localStorage.getItem(name+'rIndex'))
        let pivot:number = Number(window.localStorage.getItem(name+'pivot'))

        let completed:Array<number> = JSON.parse(window.localStorage.getItem(name+'completed') ?? "[69420]")
        let working:number = Number(window.localStorage.getItem(name+'working'))

        let finished:number = Number(window.localStorage.getItem(name+'finished'))
        


        if(finished !== 0)
            return
        
        let steps:number = Number(window.localStorage.getItem(name+ "steps"))
        window.localStorage.setItem(name+ "steps", String(steps+1))
        setSteps(steps+1)
        

        // if(completed == [69420])
        //     console.log("error: completed not initiated");

        // color stuff
        
        for( let x:number = 0; x < data.length; x++){
            
            document.getElementById("bar"+(x).toString()+name).style.backgroundColor = "grey" 
        }

        document.getElementById("bar"+(pivot).toString()+name).style.backgroundColor = "green"

        
        // determin if a section of the array is being sorted
        if (working === 1){
            quickSortFunction(lIndex, rIndex, pivot)
            // if(lIndex <= rIndex){
            //     console.log(lIndex, rIndex, pivot);

                
                
            //     quickSortInner(lIndex, rIndex, pivot)
            // } else {
            //     quickSortWraper(lIndex, rIndex, pivot) 
            // }
        } else {
            console.log("working = false");
            
            // determing what part of the array to work on 
                // start at the first non-completed node then 
                // end at the last completed node
                    // if the size is only 1 mark as complete and move on
            let start = -1
            let end = -1
            for(let i = 0; i < data.length; i++){
                
                if(Number(completed[i]) === 0){
                    console.log("thing:", i, start, end, Number(completed[i]));
                    
                    if(start === -1){
                        start = i
                    } 
                    end = i
                    
                }
                if(Number(completed[i]) !== 0 && start !== -1){
                    if(start === end ){
                        completed[start]= 1
                        window.localStorage.setItem(name+"completed", JSON.stringify(completed))
                        start = -1
                        end = -1
                    } else{
                        i = data.length
                    }        
                }
            }

            // if array is sorted
            if(start === -1 && end === -1){
                window.localStorage.setItem(name+ "finished", String(1))
            } else{
                console.log(start, end);
                
                // set up variables then run next set
                window.localStorage.setItem(name+'lIndex', String(start))
                window.localStorage.setItem(name+'rIndex',  String(end-1))
                window.localStorage.setItem(name+'pivot',  String(end))
                console.log("stet working to true")
                window.localStorage.setItem(name+'working',  String(1))
                quickSortFunction(start, end-1, end)
            }
        }
        
    }

    const quickSortFunction = (lIndex:number, rIndex:number, pivot:number) => {
        console.log("quick sort function");
        
        if(lIndex <= rIndex){
            console.log("quick sort function if");
            console.log(lIndex, rIndex, pivot)       
            quickSortInner(lIndex, rIndex, pivot)
        } else {
            console.log("quick sort function else");
            console.log(lIndex, rIndex, pivot)  
            quickSortWraper(lIndex, rIndex, pivot) 
        }     
        console.log("quick sort function end");
    }

    const quickSortWraper = (lIndex:number, rIndex:number, pivot:number) =>{
        console.log("quick sort wraper");
        
        let hold = data[lIndex]
        data[lIndex] = data[pivot]
        data[pivot] = hold
        let completed = JSON.parse(window.localStorage.getItem(name+'completed')?? "[42069]")
        completed[lIndex] = 1
        window.localStorage.setItem(name+'completed', JSON.stringify(completed))
        window.localStorage.setItem(name+'working', String(0))
        setData([...data])
        // color
        document.getElementById("bar"+(lIndex).toString()+name).style.backgroundColor = "green"
        // document.getElementById("bar"+(pivot).toString()+name).style.backgroundColor = "blue"
        console.log("quick sort wraper end");
        
    }

    const quickSortInner = (lIndex:number, rIndex:number, pivot:number) =>{

        if(data[rIndex] < data[pivot] && data[lIndex] > data[pivot]){
            console.log("swap happend");

            //color
            //document.getElementById("bar"+(pivot).toString()+name).style.backgroundColor = "green"
            
            let hold = data[rIndex]
            data[rIndex] = data[lIndex]
            data[lIndex] = hold
            setData([...data])

        }
        
        // form left to right find the first number > pivot
        if (data[lIndex] > data[pivot]) {
            
        } else{
            window.localStorage.setItem(name+'lIndex', String(lIndex+1))
            
        }
        // from right to left find the first number < pivot 
        if (data[rIndex] < data[pivot]) {
            
        } else {
            
            window.localStorage.setItem(name+'rIndex', String(rIndex-1))
            
        }

        console.log(lIndex, rIndex, pivot);

        
    }

    // fix one click version

    return(
        <div className="  bg-zinc-700 px-2 border-2 rounded-md border-black w-full "  id="insertionSortWraper">
            <div className="flex">
                <h3 className="flex-1">Quick Sort</h3>
                <h4>Steps:{step}</h4>
            </div>
            
            <Graph data={data} parent={name}></Graph>
            <div id="insertionSortWraperButtons">
                <button onClick={quickSortPlay}>play</button>
                <button onClick={quickSortClick}>step</button>
            </div>
        </div>
    )
}

export default quickSortWraper