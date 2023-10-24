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

function insertionSortWraper(props:{playRef:any}) {

    const ogData = useContext(dataContext)

    const [data, setData] = useState([...ogData.dataSet])
    const [step, setSteps] = useState<number>(0)

    const name:string = "I"

    useImperativeHandle(props.playRef, () => ({

        click(func:number){
            if(func === 0){
                insertionSortPLay()
            } else if( func === 1){
                insertionSortClick()
            }
        }
      }));

    // effect to update data when ogData is modied
    useEffect(()=>{
        setData([...ogData.dataSet])
    },[ogData])

    // deep copy of ogData
    // var data:Array<Number> = []

    // useEffect to make deep copy of ogData
    // useEffect(() =>{
    //     data = [...ogData.dataSet]
    //     console.log("constructor in insetion sort ran", data);
        
    // },[ogData])


    useEffect(() =>{

        // set color of bars to grey
        for( let x = 0; x <data.length; x++){
            if(document.getElementById("bar"+(x).toString()+name))
                document.getElementById("bar"+(x).toString()+name).style.backgroundColor = "grey"
        }
        
        window.localStorage.setItem("iI", 0)
        window.localStorage.setItem("iJ", 1)
        window.localStorage.setItem("iHoldI", 0)
        window.localStorage.setItem("iHoldJ", 0)

        window.localStorage.setItem("iWorking", 0)
        window.localStorage.setItem("iFinished", 0)

        window.localStorage.setItem(name+ "steps", String(0))
        setSteps(0)
    },[data.length, ogData])

    const insertionSortPLay = () =>{
        let finished:number = Number(window.localStorage.getItem("iFinished"))
        while(finished === 0){
            insertionSortClick()
            finished = Number(window.localStorage.getItem("iFinished"))
        }
    }

    // step through
    const insertionSortClick = () =>{
        let i:number = Number(window.localStorage.getItem("iI"))
        let j:number = Number(window.localStorage.getItem("iJ"))
        let holdI:number = Number(window.localStorage.getItem("iHoldI"))
        let holdJ:number = Number(window.localStorage.getItem("iHoldJ"))

        let working:number = Number(window.localStorage.getItem("iWorking"))
        let finished:number = Number(window.localStorage.getItem("iFinished"))

        if(finished !== 0)
            return

        let steps:number = Number(window.localStorage.getItem(name+ "steps"))
        window.localStorage.setItem(name+ "steps", String(steps+1))
        setSteps(steps+1)

        // set color of bars to grey
        for( let x = 0; x <data.length; x++){
            document.getElementById("bar"+(x).toString()+"I").style.backgroundColor = "grey"
        }
        
        if(working === 0){
            // initiate a new set
            if(finished !== 0)
                return
            document.getElementById("bar"+(i).toString()+"I").style.backgroundColor = "blue"
            document.getElementById("bar"+(j).toString()+"I").style.backgroundColor = "green"
            if(data[i]>data[j]){
                window.localStorage.setItem("iHoldI", i)
                window.localStorage.setItem("iHoldJ", j)
                window.localStorage.setItem("iWorking", 1)
            }else{
                i++
                j++
                window.localStorage.setItem("iI", i)
                window.localStorage.setItem("iJ", j)
                if(j>= data.length){
                    window.localStorage.setItem("iFinished", 1)
                }
            }

        } else{
            // call helper function to got through next set
            insertionSortHelper(holdI, holdJ)
        }

    }

    const insertionSortHelper = (holdI:Number, holdJ:Number) =>{

        if(data[holdI]>data[holdJ]){
            document.getElementById("bar"+(holdI).toString()+"I").style.backgroundColor = "blue"
            document.getElementById("bar"+(holdJ).toString()+"I").style.backgroundColor = "green"
            let hold = data[holdI]
            data[holdI] = data[holdJ]
            data[holdJ] = hold       
            holdI--
            holdJ--
            window.localStorage.setItem("iHoldI", holdI)
            window.localStorage.setItem("iHoldJ", holdJ)
            if(holdI<0){
                window.localStorage.setItem("iWorking", 0)
            }
        } else{
            window.localStorage.setItem("iWorking", 0)
        }
        
        setData([...data])
    }

    // fix one click version


    // one click
    const insertionSort = () =>{

        let i:Number = 0
        let j:Number = 1

        while (j< data.length){
            // compare 2 elements
            // if the one at a lower index is larger than the one at a higher index swap
            let holdI = i
            let holdJ = j

            while(holdI >= 0){
                if(data[holdI]> data[holdJ]){
                    // swap
                    let hold = data[holdI]
                    data[holdI] = data[holdJ]
                    data[holdJ] = hold
                    // move comparison indices one to the left 
                    holdI--
                    holdJ--
                    // if the left most index is <0 exit loop
                } else {
                    holdI = -1
                }
                
            }                     
            // move to next set
            // shift indices to the right 1
            i++
            j++
        }  
        setData([...data]) 
    }




    return(
        <div className="  bg-zinc-700 px-2 border-2 rounded-md border-black w-full "  id="insertionSortWraper">
            
            <div className="flex">
                <h3 className="flex-1">Insertion Sortt</h3>
                <h4>Steps:{step}</h4>
            </div>
            <Graph data={data} parent={name}></Graph>
            <div id="insertionSortWraperButtons">
                <button onClick={insertionSortPLay}>play</button>
                <button onClick={insertionSortClick}>step</button>
            </div>
        </div>
    )
}

export default insertionSortWraper