import { useState, useEffect, useContext, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Checkbox from './componets/checkbox/checkbox'
import AlgorithmMenu from './componets/submenu/algorithMenu'
import DataMenu from './componets/submenu/dataMenu'
import DataEditor from './componets/menu/dataEditor'

import DropDownMenu from './componets/menu/dropDownMenu'

import Graph from './componets/graph/graph'
import GraphWraper from './componets/graph/graphWraper'
import GraphWrapper from './componets/graph/graphWrapper'

import InsertionSortWraper from './componets/graph/insertionSortWraper'
import SelectionSortWraper from './componets/graph/selectionSortWraper'
import QuickSortWraper from './componets/graph/quickSortWraper'
import MergeSortWrapper from './componets/graph/mergeSortWrapper'
import BubbleSortWrapper from './componets/graph/bubbleSortWrapper'

// contexts
import { dataContext } from './contexts/dataContext'
import { algoContext } from './contexts/algoContext'
import { canvasContext } from './contexts/cavasContext'


interface point {
  x: number
  y: number
}

interface canvas{
  width:number
  height:number
}

interface algo {
  name: string,
  active: boolean
}


function App() {

  // data
  const [dataSet,setDataSet] = useState<Array<number>> ([])

  // canvas size
  const [canvas, setCanvas] = useState<canvas>({width:1000, height:500})

  // dimentions of bars in graph
  const [barWidth, setBarWidth] = useState<number>(0)
    // a multipyer is used for the height to ensuere all data points
    // are in bounds of the canvas
  const [barHeightMult, setBarHeightMult] = useState<number>(0)


  // context for all algorithms

  const [sortAlgos, setSortAlgos] = useState<Array<algo>>([
     {name: "bubble", active: false},
    {name: "quick", active: false},
    {name: "insertion", active: false},
    {name: "merge", active: false},
    {name:"selection", active: false},
  ]
)

  // init sortAlgos
  // useEffect(()=>{
  //   console.log("init of sortalgos");
    

  //   let hold:Array<algo> = [
  //     {name: "Bubble", active: false},
  //     {name: "Quick sort", active: false},
  //     {name: "Insertion", active: false},
  //     {name: "Merge", active: false},
  //     {name: "Selection", active: false},
  //   ]

  //   setSortAlgos(hold)
  // },[])



  /**
   * adds data bar to canvas
   * @param start the point containg the value of the node and its position in the list
   * @param color the color of the line repesting the data
   * @param width the width of the line 
   */
  const addLine = (start:point, color:string, width:number, heightMult:number) => {

    console.log(start," : ", width)
    
    const c:HTMLCanvasElement = document.getElementById("myCanvas") as HTMLCanvasElement;
    var ctx = c.getContext("2d")!;
    ctx.beginPath();
    ctx.lineWidth = barWidth
    ctx.strokeStyle= color
    ctx.moveTo(start.x*width+(width/2), canvas.height-(start.y*heightMult));
    ctx.lineTo(start.x*width+(width/2), canvas.height);
    ctx.closePath()
    ctx.stroke();
  } 

  /**
   *  calcualtes the width for each line being added to the canavs insuring a perfect fit
   */
  const calcBarWidth = () =>{
    const width:number = canvas.width/dataSet.length
    setBarWidth( width)
  }

  /**
   * computes a multplyer, based on the max value of the data, that is used to 
   * insure the values do not go outside the canvas
   */
  const calcBarHeigh = () =>{
    const heightMult:number = (canvas.height-20)/(Math.max(...dataSet))
    setBarHeightMult(heightMult)
  }

  /**
   * 
   */
  const initGraph = () => {

    //clear canvas
    const c = document.getElementById("myCanvas");
    const context = c.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // itorate through dataset and add each element to graph
    for(let i=0; i<dataSet.length; ++i){
      const p:point = {x:i, y:dataSet[i]}
      addLine(p, "grey", barWidth, barHeightMult)
    }
    
  }


  return (
    <>
      <div className=' flex flex-col lg:flex-row w-screen bg-zinc-900 text-zinc-300 min-h-screen' >
        
        <div className='lg:h-screen mx-1'>
          <dataContext.Provider value={{dataSet, setDataSet}}>
            <algoContext.Provider value={{sortAlgos, setSortAlgos}}>
              <DropDownMenu dataSet={dataSet} setDataSet={setDataSet}/>
              <DataEditor/>
            </algoContext.Provider>
          </dataContext.Provider>
        </div>
        

        <dataContext.Provider value={{dataSet, setDataSet}}>
          <algoContext.Provider value={{sortAlgos, setSortAlgos}}>
            <GraphWrapper></GraphWrapper> 
          </algoContext.Provider>
        </dataContext.Provider>

        {/* <div>
          <canvas
          className='border-4 rounded border-black'
          id="myCanvas" 
          width={canvas.width} 
          height={canvas.height}>

          </canvas>
          <button onClick={initGraph}>
            fillout graph
          </button>
        </div> */}
      </div>
      
      
    </>
  )
}

export default App
