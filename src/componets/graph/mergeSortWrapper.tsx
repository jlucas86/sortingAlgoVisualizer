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

interface completedGroup{
    start:Number, 
    end:Number,
}


function mergeSortWrapper(props:{playRef:any}) {

    const ogData = useContext(dataContext)

    const [data, setData] = useState<Array<number>>([...ogData.dataSet])
    const [step, setSteps] = useState<number>(0)

    var name:string = "M"

    useImperativeHandle(props.playRef, () => ({

        click(func:number){
            if(func === 0){
                mergeSortPlay()
            } else if( func === 1){
                mergeSortClick()
            }
        }
      }));

    // effect to update data when ogData is modied
    useEffect(()=>{
        setData([...ogData.dataSet])
    },[ogData])


    useEffect(() =>{
        console.log("merge sort init run");
        
        // window.localStorage.setItem(name +"lIndex", String(data.length))
        // window.localStorage.setItem(name +"rIndex", String(data.length-2))
        // window.localStorage.setItem(name+ "pivot", String(data.length-1))

        // window.localStorage.setItem(name+ "Working", String(0))
        // // window.localStorage.setItem(name+ "Finished", String(0))

        // let completed:Array<number> = []

        // for(let i:number = 0; i < data.length; i++){
        //     completed[i] = 0
        // }

        // window.localStorage.setItem(name+ "completed", JSON.stringify(completed))

        // set color of bars to grey
        for( let x = 0; x <data.length; x++){
            if(document.getElementById("bar"+(x).toString()+name))
                document.getElementById("bar"+(x).toString()+name).style.backgroundColor = "grey"
        }


        window.localStorage.setItem(name+'msCompleted', JSON.stringify([]))
        window.localStorage.setItem(name+'msWorking', String(0))
        window.localStorage.setItem(name+'msToSort', JSON.stringify([]))
        window.localStorage.setItem(name+'msSortIndex', String(0))
        window.localStorage.setItem(name+'msI',String(0))
        window.localStorage.setItem(name+'msJ',String(0))
        window.localStorage.setItem(name+'msStart', String(0))
        window.localStorage.setItem(name+'msEnd', String(data.length -1))
        window.localStorage.setItem(name+'msEndFlag', String(0))
        window.localStorage.setItem(name+'finished', String(0))

        window.localStorage.setItem(name+ "steps", String(0))
        setSteps(0)

    },[data.length, ogData])


    // one click (play)
    const mergeSortPlay = () =>{
        let finished:number = Number(window.localStorage.getItem(name+'finished'))
        while(finished === 0){
            mergeSortClick()
            finished = Number(window.localStorage.getItem(name+'finished'))
        }
    }


    // step through
    const mergeSortClick = () =>{

        let working:number = Number(window.localStorage.getItem(name+'msWorking'))
        let finished:number = Number(window.localStorage.getItem(name+'finished'))

        if(finished !== 0)
            return

        let steps:number = Number(window.localStorage.getItem(name+ "steps"))
        window.localStorage.setItem(name+ "steps", String(steps+1))
        setSteps(steps+1)
            

        let completed:Array<completedGroup> =
            JSON.parse(window.localStorage.getItem(name+'msCompleted')?? "[{start:420, end:69}]")

        // not curently being worked on
        if(working === 0){
            console.log('merge sort click working = ', working);
            // find go to the next section of the array to sort
            mergeSortFinder(0, data.length-1, completed)
            let start:number = Number(window.localStorage.getItem(name+'msStart'))
            let end:number = Number(window.localStorage.getItem(name+'msEnd'))
            console.log(start, end);
            
            let half = Math.floor(((end-start)+1)/2)
            console.log("HAAAAAAAAAAAAAAALLLLLLLLLLLLLFFFFFFFF: ", half)
            window.localStorage.setItem(name+'msI',  String(0))
            window.localStorage.setItem(name+'msJ',  String(half))
            window.localStorage.setItem(name+'msSortIndex',  String(0))
            window.localStorage.setItem(name+'msEndFlag',  String(0))

            let toSort:Array<number> = []

            for(let i = start; i <= end; i++){
                toSort.push(data[i])
                console.log(i)
                document.getElementById("bar"+(i).toString()+name).style.backgroundColor = "blue"
            }
            window.localStorage.setItem(name+'msToSort', JSON.stringify([...toSort]))
            window.localStorage.setItem(name+'msWorking', String(1))
            window.localStorage.setItem(name+'msHalf',  String(Math.floor(((end-start)+1)/2)))


        }else{
            console.log('merge sort click working = ', working);
            let toSort:Array<number> = JSON.parse(window.localStorage.getItem(name+'msToSort')??"")
            let sortIndex:number = Number(window.localStorage.getItem(name+'msSortIndex'))
            let i:number = Number(window.localStorage.getItem(name+'msI'))
            let j:number = Number(window.localStorage.getItem(name+'msJ'))
            console.log("LOOOOOOOOOOOKKKKKKKKK: ", j);

            
            
            let start:number = Number(window.localStorage.getItem(name+'msStart'))
            let end:number = Number(window.localStorage.getItem(name+'msEnd'))
            let half:number = Math.floor(((end-start)+1)/2)

            

            if(sortIndex === 0 && (end-start+1)%2 === 1){
                window.localStorage.setItem(name+'msJ', half+1)
                window.localStorage.setItem(name+'msHalf', half+1)
            }

            j = Number(window.localStorage.getItem(name+'msJ'))
            half = Number(window.localStorage.getItem(name+'msHalf'))
            // continue sorting the array
            mergeSortHelper(start, end, half, i, j, sortIndex, toSort, completed)
            // } else{
            //     mergeSortHelper(start, end, half+1, i, j+1, sortIndex, toSort, completed)
            // }
            
            
        }
        
    }

    // find the next area to be sorted
    const mergeSortFinder = (start:number, end:number, completed:Array<completedGroup>) =>{

        console.log('merge sort finder entered');

        let half = Math.floor(((end-start)+1)/2)

        let hold:completedGroup = {start:start, end:end}
        // completed.push(hold)
        console.log(completed, hold,completed.find((element) => element.start === hold.start && element.end === hold.end) );
        
        
        
        // base case
        // section of array is not finished
        if(completed.find((element) => element.start ===start && element.end ===end) ){
            console.log("match found");
            
            return
        }

        // setcion of array is larger than 1 element
        if (start === end) {
            return
        }

        window.localStorage.setItem(name+'msStart',  String(start))
        window.localStorage.setItem(name+'msEnd',  String(end))

        // error is in here some where, the return is preventing the section from running

        if(!completed.find((element) => element.start === start && element.end === end-half)){
            console.log("top function", start, end-half);
            mergeSortFinder(start, end-half, completed)
            let startHold = window.localStorage.getItem(name+'msStart')
            let endHold = window.localStorage.getItem(name+'msEnd')
            
            console.log("top function part 2:", startHold, endHold);
            
            // if(startHold === start || endHold === end){
            //     mergeSortFinder(end-half+1, end, completed)
            // }
            return
        }

        if(!completed.find((element) => element.start === end-half+1 && element.end === end)){
            console.log("bottom function", end-half+1, end );
            mergeSortFinder(end-half+1, end, completed)
            return
        }
    }


    // helper function that does step by step array sorting
    const mergeSortHelper = (start:number, end:number, half:number,  i:number,
        j:number, sortIndex:number, toSort:Array<number>, completed:Array<completedGroup>) =>{
            

        console.log('merge sort helper entered');
        console.log(data.length, sortIndex, start, i, end, j);
        console.log(data,toSort);

        half = Number(window.localStorage.getItem(name+'msHalf'))


        if(Number(window.localStorage.getItem(name+'msEndFlag')) === 1){
            console.log("enter flag sections");
            
            if(i>=half){
                // do j
                console.log("_______________________________________________________");
                console.log("j is finished");

                let hold = data[sortIndex+start]
                data[sortIndex + start] = toSort[j]
                document.getElementById("bar"+(sortIndex + start).toString()+name).style.backgroundColor = "green"
                // if(j !== end){
                //     data[j+start] = hold // problem is here
                // }                
                sortIndex++
                j++
                window.localStorage.setItem(name+'msSortIndex',  String(sortIndex))
                window.localStorage.setItem(name+'msJ', String(j))
            } else if(j>end-start){
                // do i
                console.log("_______________________________________________________");
                console.log("i is finished");
                
                
                let hold = data[sortIndex+start]
                data[sortIndex + start] = toSort[i]
                document.getElementById("bar"+(sortIndex + start).toString()+name).style.backgroundColor = "green"
                // if(i!==half){ 
                    
                //     data[i+start] = hold // problem is here
                // }
                sortIndex++
                i++
                window.localStorage.setItem(name+'msSortIndex',  String(sortIndex))
                window.localStorage.setItem(name+'msI', String(i))
            }
        }
               
        else if(toSort[i]<toSort[j]){   
            console.log("enterd sorting part");
             
            if(i<half){
                console.log("thing 1");
                
                let hold = data[sortIndex+start]
                data[sortIndex + start] = toSort[i]
                // data[i+start] = hold
                document.getElementById("bar"+(sortIndex + start).toString()+name).style.backgroundColor = "green"
                sortIndex++
                i++
                if(i>=half){
                    window.localStorage.setItem(name+'msEndFlag', String(1))
                }
                window.localStorage.setItem(name+'msSortIndex',  String(sortIndex))
                window.localStorage.setItem(name+'msI', String(i))
            }
            // all of this array from this partition is in the array
            else{
                console.log("thing 2");
                let hold = data[sortIndex+start]
                data[sortIndex + start] = toSort[j]
                // data[j+start] = hold
                document.getElementById("bar"+(sortIndex + start).toString()+name).style.backgroundColor = "green"
                sortIndex++
                j++
                window.localStorage.setItem(name+'msSortIndex',  String(sortIndex))
                window.localStorage.setItem(name+'msJ', String(j))
            }
        }
        // if data at half is larger adda data at half to array then increment counter(j)
        else{ 
            if(j<=end-start){
                console.log("thing 3");
                let hold = data[sortIndex+start]
                data[sortIndex + start] = toSort[j]
                // data[j+start] = hold
                document.getElementById("bar"+(sortIndex + start).toString()+name).style.backgroundColor = "green"
                sortIndex++
                j++
                if(j>end-start){
                    window.localStorage.setItem(name+'msEndFlag', String(1))
                }
                window.localStorage.setItem(name+'msSortIndex',  String(sortIndex))
                window.localStorage.setItem(name+'msJ', String(j))
            }   
            // all of this array from this partition is in the array
            else{
                console.log("thing 4");
                let hold = data[sortIndex+start]
                data[sortIndex + start] = toSort[i]
                document.getElementById("bar"+(sortIndex + start).toString()+name).style.backgroundColor = "green"
                // data[i+start] = hold
                sortIndex++
                i++
                window.localStorage.setItem(name+'msSortIndex',  String(sortIndex))
                window.localStorage.setItem(name+'msI', String(i))
            }
        }

        console.log('merge sort helper middle');
        console.log(data.length, sortIndex, start, i, end, j);

        // setcion is fully sorted
        if(sortIndex === toSort.length ){
            console.log("updated var");
            console.log(completed);
            
            for(let i = start; i<=end; i++){
                document.getElementById("bar"+(i).toString()+name).style.backgroundColor = "grey"
            }
            
            // updat variables
            window.localStorage.setItem(name+'msWorking',  String(0))
            window.localStorage.setItem(name+'msCompleted', 
                JSON.stringify([...completed, {start:start, end:end}]))
        }
        setData([...data])

        if(data.length === toSort.length && sortIndex === toSort.length){
            window.localStorage.setItem(name+'finished',  String(1))
        }

        console.log('merge sort helper exit');
        console.log(data.length, sortIndex, start, i, end, j);
        console.log(data,toSort);
        
        
    }

    // fix one click version

    return(
        <div className="  bg-zinc-700 px-2 border-2 rounded-md border-black w-full  "  id="insertionSortWraper">
            
            <div className="flex">
                <h3 className="flex-1">Merge Sort</h3>
                <h4>Steps:{step}</h4>
            </div>
            <Graph data={data} parent={name}></Graph>
            <div id="insertionSortWraperButtons">
                <button onClick={mergeSortPlay}>play</button>
                <button onClick={mergeSortClick}>step</button>
            </div>
        </div>
    )
}

export default mergeSortWrapper