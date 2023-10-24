
import { useState, useEffect, useContext, useRef } from "react";



import Graph from "./graph.tsx"

import InsertionSortWraper from './insertionSortWraper'
import SelectionSortWraper from './selectionSortWraper'
import QuickSortWraper from './quickSortWraper'
import MergeSortWrapper from './mergeSortWrapper'
import BubbleSortWrapper from './bubbleSortWrapper'


// context
import { dataContext } from "../../contexts/dataContext";
import { algoContext } from "../../contexts/algoContext";


/**
 * componet that will display a graph contating data from the data context and
 * buttons to allow the user to sort the array.
 *      - play button will sort the array in one go with some sort of delay between steps
 *      - next step buttion will do the next step in sorting the array
 * 
 */

function graphWrapper() {

    const data = useContext(dataContext)
    const algo = useContext(algoContext)

    const bubble = useRef()
    const insertion = useRef()
    const merge = useRef()
    const quick = useRef()
    const selection = useRef()

    let play:number = 0

    const playAll = () =>{
        
        // determin active sorting algos
        activeGraphs()
        // call play function for active alogs
        play++
        console.log(play);

        if(algo.sortAlgos[0].active)
            bubble.current.click(0)
        if(algo.sortAlgos[1].active)
            quick.current.click(0)         
        if(algo.sortAlgos[2].active)
            insertion.current.click(0)         
        if(algo.sortAlgos[3].active)
            merge.current.click(0)
        if(algo.sortAlgos[4].active)
            selection.current.click(0)
        
        

    }

    const stepAll = () =>{

        // determin active sorting algos
        activeGraphs()
        // call step function for active alogs
        if(algo.sortAlgos[0].active)
            bubble.current.click(1)
        if(algo.sortAlgos[1].active)
            quick.current.click(1)         
        if(algo.sortAlgos[2].active)
            insertion.current.click(1)         
        if(algo.sortAlgos[3].active)
            merge.current.click(2)
        if(algo.sortAlgos[4].active)
            selection.current.click(2)
        
    }

    /**
     * helper function that goes through an array of sorting algortihms 
     * then returns the active once
     */
    const activeGraphs = () =>{}

    /**
     * pass a ref to each child to cause it to run eather play or step
     * the same two ref will be passed to each child as a prop
     * 
     * each child will determin if they are active. if active they will run based on the ref 
     */

    return(
        <div className="bg-zinc-800 px-4 py-2 lg:w-full border-4 rounded border-black my-2 mx-1" id="graphWrapper">
            <div id="insertionSortWraperButtons">
                <button onClick={playAll}>Play All</button>
                <button onClick={stepAll}>Step All</button>
                {/* gid for graphs */}
                <div className="flex">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-1 w-full">
                    {
                        algo.sortAlgos[0].active ? (<BubbleSortWrapper playRef={bubble}></BubbleSortWrapper>)
                        : (<div className="hidden"></div>)
                        // algo.sortAlgos.map((val:number, i:number)=>(
                        //     <Checkbox algo={val.name} index={i} isChecked={val.active} handleChange={algo.setSortAlgos} />
                        // ))
                    }

                    {
                        algo.sortAlgos[1].active ? (<QuickSortWraper playRef={quick}></QuickSortWraper>)
                        : (<div className="hidden"></div>)
                    }

                    {
                        algo.sortAlgos[2].active ? (<InsertionSortWraper playRef={insertion}></InsertionSortWraper>)
                        : (<div className="hidden"></div>)
                    }

                    {
                        algo.sortAlgos[3].active ? (<MergeSortWrapper playRef={merge}></MergeSortWrapper>)
                        : (<div className="hidden"></div>)
                    }

                    {
                        algo.sortAlgos[4].active ? (<SelectionSortWraper playRef={selection}></SelectionSortWraper>)
                        : (<div className="hidden"></div>)
                    }
                        {/* <InsertionSortWraper playRef={insertion}></InsertionSortWraper>
                        <SelectionSortWraper playRef={selection}></SelectionSortWraper>
                        <QuickSortWraper playRef={quick}></QuickSortWraper>
                        <MergeSortWrapper playRef={merge}></MergeSortWrapper>
                        <BubbleSortWrapper playRef={bubble}></BubbleSortWrapper> */}
                    </div>
                    {/* <InsertionSortWraper></InsertionSortWraper>
                    <SelectionSortWraper></SelectionSortWraper>
                    <QuickSortWraper></QuickSortWraper>
                    <MergeSortWrapper></MergeSortWrapper>
                    <BubbleSortWrapper></BubbleSortWrapper> */}
                </div>
            </div>
        </div>
    )
}

export default graphWrapper