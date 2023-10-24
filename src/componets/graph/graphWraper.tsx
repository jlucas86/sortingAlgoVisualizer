import { useState, useEffect, useContext } from "react";



import Graph from "./graph.tsx"


// context
import { dataContext } from "../../contexts/dataContext";

interface completedGroup{
    start:Number, 
    end:Number,
}

function graphWraper() {

    console.log("graph wraper is rerun");
    

    // vars
    var color:number = 0
    // var index1 = 0
    // var index2 = 0
    // var next = false
    // var finish = false


    // context
    
    const data = useContext(dataContext)


    // effects
    useEffect(()=>{
        console.log("inti is called");
        // index1 = data.dataSet.length -1
        // index2 = 0

        // stuff for quick sort

        window.localStorage.setItem('lIndex', 0)
        window.localStorage.setItem('rIndex', data.dataSet.length -2)
        window.localStorage.setItem('pivot', data.dataSet.length -1)

        let completed = []

        for(let i = 0; i < data.dataSet.length; i++){
            completed[i] = 0
        }

        window.localStorage.setItem('completed', JSON.stringify(completed))
        window.localStorage.setItem('working', 0)
        

        // stuff for bubble sort
        window.localStorage.setItem('index1', data.dataSet.length -1)
        window.localStorage.setItem('index2', 0)
        window.localStorage.setItem('next', false)
        window.localStorage.setItem('finish', false)

        // stuff for merge sort
        window.localStorage.setItem('msCompleted', JSON.stringify([]))
        window.localStorage.setItem('msWorking', 0)
        window.localStorage.setItem('msToSort', JSON.stringify([]))
        window.localStorage.setItem('msSortIndex', 0)
        window.localStorage.setItem('msI',0)
        window.localStorage.setItem('msJ',0)
        window.localStorage.setItem('msStart', 0)
        window.localStorage.setItem('msEnd', data.dataSet.length -1)
        window.localStorage.setItem('msEndFlag', 0)

    },[data.dataSet.length])


    // chages the value of the array
    const test = () =>{
        var hold:Array<number> = []
        for(var i=0; i<20; ++i){
            hold.push(Math.random()*100)
         }
        data.setDataSet(hold)
        console.log(data.dataSet.length);
        
        
    }

    const test1 = () =>{
        console.log(data.dataSet);
        var hold:Array<number> = data.dataSet
        var hold2 = hold[0]
        hold[0] = hold[1]
        hold[1] = hold2
        data.setDataSet([...hold])
        console.log(data.dataSet);
    }


    // merge sort

    const mergeSortButton = () =>{

        console.log("button clicked");
        
        let working:Number = Number(window.localStorage.getItem('msWorking'))
        mergeSortClick(working)
        
        // mergeSort(0, data.dataSet.length-1)
        
        // data.setDataSet([...data.dataSet])
    }


    // click through
    const mergeSortClick = (working:Number) =>{

        console.log('merge sort click entered');
        

        let completed:Array<completedGroup> =
            JSON.parse(window.localStorage.getItem('msCompleted'))

        // not curently being worked on
        if(working === 0){
            console.log('merge sort click working = ', working);
            // find go to the next section of the array to sort
            mergeSortFinder(0, data.dataSet.length-1, completed)
            let start:Number = Number(window.localStorage.getItem('msStart'))
            let end:Number = Number(window.localStorage.getItem('msEnd'))
            console.log(start, end);
            
            let half = Math.floor(((end-start)+1)/2)
            console.log("HAAAAAAAAAAAAAAALLLLLLLLLLLLLFFFFFFFF: ", half)
            window.localStorage.setItem('msI', 0)
            window.localStorage.setItem('msJ', half)
            window.localStorage.setItem('msSortIndex', 0)
            window.localStorage.setItem('msEndFlag', 0)

            let toSort:Array<Number> = []

            for(let i = start; i <= end; i++){
                toSort.push(data.dataSet[i])
                console.log(i)
                document.getElementById("bar"+(i).toString()).style.backgroundColor = "blue"
            }
            window.localStorage.setItem('msToSort', JSON.stringify([...toSort]))
            window.localStorage.setItem('msWorking', 1)
            window.localStorage.setItem('msHalf', Math.floor(((end-start)+1)/2))


        }else{
            console.log('merge sort click working = ', working);
            let toSort:Array<Number> = JSON.parse(window.localStorage.getItem('msToSort'))
            let sortIndex:Number = Number(window.localStorage.getItem('msSortIndex'))
            let i:Number = Number(window.localStorage.getItem('msI'))
            let j:Number = Number(window.localStorage.getItem('msJ'))
            console.log("LOOOOOOOOOOOKKKKKKKKK: ", j);

            
            
            let start:Number = Number(window.localStorage.getItem('msStart'))
            let end:Number = Number(window.localStorage.getItem('msEnd'))
            let half:Number = Math.floor(((end-start)+1)/2)

            

            if(sortIndex === 0 && (end-start+1)%2 === 1){
                window.localStorage.setItem('msJ', half+1)
                window.localStorage.setItem('msHalf', half+1)
            }

            j = Number(window.localStorage.getItem('msJ'))
            half = Number(window.localStorage.getItem('msHalf'))
            // continue sorting the array
            mergeSortHelper(start, end, half, i, j, sortIndex, toSort, completed)
            // } else{
            //     mergeSortHelper(start, end, half+1, i, j+1, sortIndex, toSort, completed)
            // }
            
            
        }
    }

    // find the next area to be sorted
    const mergeSortFinder = (start:Number, end:Number, completed:Array<Number>) =>{

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

        window.localStorage.setItem('msStart',  start)
        window.localStorage.setItem('msEnd',  end)

        // error is in here some where, the return is preventing the section from running

        if(!completed.find((element) => element.start === start && element.end === end-half)){
            console.log("top function", start, end-half);
            mergeSortFinder(start, end-half, completed)
            let startHold = window.localStorage.getItem('msStart')
            let endHold = window.localStorage.getItem('msEnd')
            
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
    const mergeSortHelper = (start:number, end:number, half:Number,  i:Number,
        j:Number, sortIndex:Number, toSort:Array<Number>, completed:Array<Number>) =>{
            

        console.log('merge sort helper entered');
        console.log(data.dataSet.length, sortIndex, start, i, end, j);
        console.log(data.dataSet,toSort);

        half = window.localStorage.getItem('msHalf')


        if(Number(window.localStorage.getItem('msEndFlag')) === 1){
            console.log("enter flag sections");
            
            if(i>=half){
                // do j
                console.log("_______________________________________________________");
                console.log("j is finished");

                let hold = data.dataSet[sortIndex+start]
                data.dataSet[sortIndex + start] = toSort[j]
                document.getElementById("bar"+(sortIndex + start).toString()).style.backgroundColor = "green"
                // if(j !== end){
                //     data.dataSet[j+start] = hold // problem is here
                // }                
                sortIndex++
                j++
                window.localStorage.setItem('msSortIndex',  sortIndex)
                window.localStorage.setItem('msJ', j)
            } else if(j>end-start){
                // do i
                console.log("_______________________________________________________");
                console.log("i is finished");
                
                
                let hold = data.dataSet[sortIndex+start]
                data.dataSet[sortIndex + start] = toSort[i]
                document.getElementById("bar"+(sortIndex + start).toString()).style.backgroundColor = "green"
                // if(i!==half){ 
                    
                //     data.dataSet[i+start] = hold // problem is here
                // }
                sortIndex++
                i++
                window.localStorage.setItem('msSortIndex',  sortIndex)
                window.localStorage.setItem('msI', i)
            }
        }
               
        else if(toSort[i]<toSort[j]){   
            console.log("enterd sorting part");
             
            if(i<half){
                console.log("thing 1");
                
                let hold = data.dataSet[sortIndex+start]
                data.dataSet[sortIndex + start] = toSort[i]
                // data.dataSet[i+start] = hold
                document.getElementById("bar"+(sortIndex + start).toString()).style.backgroundColor = "green"
                sortIndex++
                i++
                if(i>=half){
                    window.localStorage.setItem('msEndFlag', 1)
                }
                window.localStorage.setItem('msSortIndex',  sortIndex)
                window.localStorage.setItem('msI', i)
            }
            // all of this array from this partition is in the array
            else{
                console.log("thing 2");
                let hold = data.dataSet[sortIndex+start]
                data.dataSet[sortIndex + start] = toSort[j]
                // data.dataSet[j+start] = hold
                document.getElementById("bar"+(sortIndex + start).toString()).style.backgroundColor = "green"
                sortIndex++
                j++
                window.localStorage.setItem('msSortIndex',  sortIndex)
                window.localStorage.setItem('msJ', j)
            }
        }
        // if data at half is larger adda data at half to array then increment counter(j)
        else{ 
            if(j<=end-start){
                console.log("thing 3");
                let hold = data.dataSet[sortIndex+start]
                data.dataSet[sortIndex + start] = toSort[j]
                // data.dataSet[j+start] = hold
                document.getElementById("bar"+(sortIndex + start).toString()).style.backgroundColor = "green"
                sortIndex++
                j++
                if(j>end-start){
                    window.localStorage.setItem('msEndFlag', 1)
                }
                window.localStorage.setItem('msSortIndex',  sortIndex)
                window.localStorage.setItem('msJ', j)
            }   
            // all of this array from this partition is in the array
            else{
                console.log("thing 4");
                let hold = data.dataSet[sortIndex+start]
                data.dataSet[sortIndex + start] = toSort[i]
                document.getElementById("bar"+(sortIndex + start).toString()).style.backgroundColor = "green"
                // data.dataSet[i+start] = hold
                sortIndex++
                i++
                window.localStorage.setItem('msSortIndex',  sortIndex)
                window.localStorage.setItem('msI', i)
            }
        }

        console.log('merge sort helper middle');
        console.log(data.dataSet.length, sortIndex, start, i, end, j);

        // setcion is fully sorted
        if(sortIndex === toSort.length ){
            console.log("updated var");
            console.log(completed);
            
            for(let i = start; i<=end; i++){
                document.getElementById("bar"+(i).toString()).style.backgroundColor = "grey"
            }
            
            // updat variables
            window.localStorage.setItem('msWorking',  0)
            window.localStorage.setItem('msCompleted', 
                JSON.stringify([...completed, {start:start, end:end}]))
        }
        data.setDataSet([...data.dataSet])

        console.log('merge sort helper exit');
        console.log(data.dataSet.length, sortIndex, start, i, end, j);
        console.log(data.dataSet,toSort);

        
    }







    // one click

    const mergeSort = (start:Number, end:Number) =>{

        // if divid inhalf if size is larger than 1
            // then call call merge sort on each half  
                // if uneven odd number is on right
        if (start !== end) {
            console.log("start: ", start, ", end: ", end)
            let half = Math.floor(((end-start)+1)/2)
            if((end-start+1)%2 == 0){
                mergeSort(start, end-half)
                mergeSort(end-half+1, end)
                // sort
                mergeSortSorter(start, end, end-half+1)
            } else{
                mergeSort(start, end-half)
                mergeSort(end-half+1, end)
                // sort
                mergeSortSorter(start, end, end-half+1)
            }

            // // sort
            // mergeSortSorter(start, end, end-half)

        }
    } 

    const mergeSortSorter = (start:Number, end:Number, half:Number) =>{

        console.log("called helper function", start, end, half);
        console.log(data.dataSet)
        

        // place holder array
        let holdArray:Array<Number> = []

        // indedx for first half
        let i:Number = start
        // index for second half
        let j:Number = half

        

        

        //loop to go through array
        while (holdArray.length < (end-start+1)) {

            // if the data at start is smaller than half add data at start to array
                // increment counter (i)
            if(data.dataSet[i]<data.dataSet[j]){    
                if(i<half){
                    holdArray.push(data.dataSet[i])
                    i++
                }
                // all of this array from this partition is in the array
                else{
                    holdArray.push(data.dataSet[j])
                    j++
                }
            }
            // if data at half is larger adda data at half to array then increment counter(j)
            else{ 
                if(j<=end){
                    holdArray.push(data.dataSet[j])
                    j++
                }   
                // all of this array from this partition is in the array
                else{
                    holdArray.push(data.dataSet[i])
                    i++
                }
            }
            console.log(holdArray);    
        }
        

        for (let i = start,j = 0; i <= end; i++, j++) {
            console.log(i,j);
            
            data.dataSet[i] = holdArray[j]
        }
        console.log(data.dataSet)

        
        
    }

      



    // quick sort

    const quickSortButton = () =>{
        
        // quickSort(0, data.dataSet.length-1)

        let lIndex = Number(window.localStorage.getItem('lIndex'))
        let rIndex = Number(window.localStorage.getItem('rIndex'))
        let pivot = Number(window.localStorage.getItem('pivot'))

        let completed = JSON.parse(window.localStorage.getItem('completed'))
        let working = Number(window.localStorage.getItem('working'))

        console.log(working);
        

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
            for(let i = 0; i < data.dataSet.length; i++){
                
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
                        window.localStorage.setItem("completed", JSON.stringify(completed))
                        start = -1
                        end = -1
                    } else{
                        i = data.dataSet.length
                    }        
                }
            }

            // if array is sorted
            if(start === -1 && end === -1){
                console.log("finished");      
            } else{
                console.log(start, end);
                
                // set up variables then run next set
                window.localStorage.setItem('lIndex', start)
                window.localStorage.setItem('rIndex', end-1)
                window.localStorage.setItem('pivot', end)
                console.log("stet working to true")
                window.localStorage.setItem('working', 1)
                quickSortFunction(start, end-1, end)
            }
            
                
        }

        //determin whitch setction of the array to use

        // if(lIndex <= rIndex){
        //     console.log(lIndex, rIndex, pivot);
            
        //     quickSortInner(lIndex, rIndex, pivot)
        // } else {
        //     quickSortWraper(lIndex, rIndex, pivot)     
        //     // quickSortInner()
        // }

    }

    const quickSortFunction = (lIndex:Number, rIndex:Number, pivot:Number) => {
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

    const quickSortWraper = (lIndex:Number, rIndex:Number, pivot:Number) =>{
        console.log("quick sort wraper");
        
        let hold = data.dataSet[lIndex]
        data.dataSet[lIndex] = data.dataSet[pivot]
        data.dataSet[pivot] = hold
        let completed = JSON.parse(window.localStorage.getItem('completed'))
        completed[lIndex] = 1
        window.localStorage.setItem('completed', JSON.stringify(completed))
        window.localStorage.setItem('working', 0)
        data.setDataSet([...data.dataSet])
        console.log("quick sort wraper end");
        
    }

    const quickSortInner = (lIndex:Number, rIndex:Number, pivot:Number) =>{

        

        if(data.dataSet[rIndex] < data.dataSet[pivot] && data.dataSet[lIndex] > data.dataSet[pivot]){
            console.log("swap happend");
            
            let hold = data.dataSet[rIndex]
            data.dataSet[rIndex] = data.dataSet[lIndex]
            data.dataSet[lIndex] = hold
            data.setDataSet([...data.dataSet])
        }
        
        // form left to right find the first number > pivot
        if (data.dataSet[lIndex] > data.dataSet[pivot]) {
            
        } else{
            window.localStorage.setItem('lIndex', lIndex+1)
        }
        // from right to left find the first number < pivot 
        if (data.dataSet[rIndex] < data.dataSet[pivot]) {
            
        } else {
            
            window.localStorage.setItem('rIndex', rIndex-1)
        }

        console.log(lIndex, rIndex, pivot);
    }

    const quickSort = (start:Number, end:Number) =>{
        
        // determin pivot (pivot will always be the last element in the array)
        let pivot:Number = end
        // change color to green 
        // move pivot to end of array (keepeing the color green)
        document.getElementById("bar"+(pivot).toString()).style.backgroundColor = "green";
        
        // place holder varianles for left and right index
        let lIndex:Number = start
        let rIndex:Number = end -1

        while (lIndex <= rIndex) {
            console.log("lIndex: ", lIndex, ", rIndex: ", rIndex);

            // swap places

            if(data.dataSet[rIndex] < data.dataSet[pivot] && data.dataSet[lIndex] > data.dataSet[pivot]){
                console.log("swap happend");
                
                let hold = data.dataSet[rIndex]
                data.dataSet[rIndex] = data.dataSet[lIndex]
                data.dataSet[lIndex] = hold
                data.setDataSet([...data.dataSet])
                // lIndex++
                // rIndex--
            }
            
            // form left to right find the first number > pivot
            if (data.dataSet[lIndex] > data.dataSet[pivot]) {
                
            } else{
                lIndex++
            }
            // from right to left find the first number < pivot 
            if (data.dataSet[rIndex] < data.dataSet[pivot]) {
                
            } else {
                rIndex--
            }

            // console.log("lIndex: ", lIndex, ", rIndex: ", rIndex);

            
            
        }
        console.log("lIndex: ", lIndex, ", rIndex: ", rIndex);

        // swap pivot with lIndex
        let hold = data.dataSet[lIndex]
        data.dataSet[lIndex] = data.dataSet[pivot]
        data.dataSet[pivot] = hold
        data.setDataSet([...data.dataSet])

        document.getElementById("bar"+(lIndex).toString()).style.backgroundColor = "red";

        // pivot location is saved
        pivot = lIndex

        //divide into 2 new arrays and call function
        
        //left half
        if (pivot > start +1){
            quickSort(start, pivot-1)
        } 

        if (pivot < end-1){
            quickSort(pivot+1, end)
        }

        // when item from left index > item from right index,  swap item from left with pivot
        // pivot should now be in the right place

        // recall function for smaller arrays on eather side of the pivot
    }

    



    // const test = () =>{
    //     console.log("next: ", next, ", index2: ", index2, ", index1: ", index1, ", length: ",  data.dataSet.length)
    //     if(index2 < data.dataSet.length){
            
    //         if(next === false)
    //             bubbleOuter()
    //         else
    //             bubbleInner()
    //         console.log(data.dataSet);
            
    //     }
        
    //     // setTimeout(() => {
    //     //     document.getElementById("bar0").style.backgroundColor = "green";
    //     //     document.getElementById("bar1").style.backgroundColor = "orange";
    //     // }, 1000);

        
    // }


    const button = () =>{
        let index2 = Number(window.localStorage.getItem("index2"))
        let index1 = Number(window.localStorage.getItem("index1"))
        let next = window.localStorage.getItem("next")

        console.log("next: ", next, ", index1: ", index1, ", index2: ", index2, ", length: ", data.dataSet.length);
        

        if(index2 < data.dataSet.length){
            
            if(next == 'false')
                bubbleOuter()
            else
                bubbleInner()
        }
    }

    // bubble sort brokend down by parts 

    const bubbleOuter = () =>{

        let index2 = Number(window.localStorage.getItem("index2"))
        let index1 = Number(window.localStorage.getItem("index1"))
        let next = window.localStorage.getItem("next")

        console.log("outer")
        if(index1 > 0){
            window.localStorage.setItem('index2', 0)
            // index2 = 0
            bubbleInner()      
        }
        else{
            console.log("finished")
        }
    }

    const bubbleInner = () =>{

        let index2 = Number(window.localStorage.getItem("index2"))
        let index1 = Number(window.localStorage.getItem("index1"))
        let next = window.localStorage.getItem("next")
        console.log("inner", "bar"+(index2+1))

        if(index2 < index1 ){
            window.localStorage.setItem('next', true)
            //next = true
            
            document.getElementById("bar"+(index2).toString()).style.backgroundColor = "blue";
            document.getElementById("bar"+(index2+1).toString()).style.backgroundColor = "red";
            setTimeout(() => {
                if(data.dataSet[index2]> data.dataSet[index2+1]){
                    let hold = data.dataSet[index2]
                    data.dataSet[index2] = data.dataSet[index2+1]
                    data.dataSet[index2+1] = hold
                    data.setDataSet([...data.dataSet])
                    console.log("index: ", data.dataSet[index2], ", index+1: ", data.dataSet[index2+1])
                }
                    
                document.getElementById("bar"+(index2).toString()).style.backgroundColor = "grey";
                document.getElementById("bar"+(index2+1).toString()).style.backgroundColor = "grey";
                window.localStorage.setItem('index2', index2+1)
                // index2++
            }, 1000);
            
        }
        else{
            console.log("set to false")
            window.localStorage.setItem('next', false)
            window.localStorage.setItem('index1', index1-1)
            // next = false
            // index1--
        }
    }

    return(
        <div className="bg-blue-500 w-full">
            <Graph data={data.dataSet}></Graph>
            <button className="bg-green-700" onClick={test}> graph rapper test</button>
            <button className="bg-red-700" onClick={test1}> graph rapper test</button>
            <button className="bg-yellow-700" onClick={button}> bubble sort</button>
            <button className="bg-purple-700" onClick={quickSortButton}> quick sort</button>
            <button className="bg-green-700" onClick={mergeSortButton}> merge sort</button>
            
        </div>
    )
    
}

export default graphWraper