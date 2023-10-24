import { useState, useEffect, useContext } from "react";


// contexts
import { dataContext } from "../../contexts/props.dataContext";
import { canvasContext } from "../../contexts/cavasContext";

// logic
import {getBarWidth, getBarHeightMultipyer} from "../../logic/graphCalc/graphCalculations.js"
//import { bubbleSort } from "../../logic/algo/bubbleSort.js";

// componets
import Bar from "./bar.tsx"

// /**
//  * 
//  * @returns a canvas element that cotains a bar graph based on the props.dataset
//  */

// function graph() {

//     const canvas = useContext(canvasContext)
//     const props.data = useContext(props.dataContext)

//     const [width, setWidth] = useState(0)
//     const [heightMult, setHeightMult] = useState(0)



//     useEffect(() => {
//         if(props.data.length > 0){
//             // console.log(getBarWidth(canvas.canvas.width, props.data.length))
//             // console.log(getBarHeightMultipyer(canvas.canvas.height, props.data))
            
//             // calaculate and set width and height multiplier
//             setWidth(getBarWidth(canvas.canvas.width, props.data.length))
//             setHeightMult(getBarHeightMultipyer(canvas.canvas.height, props.data))
//         }
//         // intualize graph with bars
//         initGraph()
        
//     },[width, heightMult, props.data.length])

//     const testFunctions = () =>{
//         console.log(getBarWidth(canvas.canvas.width, props.data.length))
//     }

//     /**
//      * 
//      * @param color color of bar
//      * @param position  
//      */
//     const drawBar = (color:string, index:number) =>{

//         const c:HTMLCanvasElement = document.getElementById("myCanvas") as HTMLCanvasElement;
//         var ctx = c.getContext("2d")!;
//         ctx.beginPath();
//         ctx.lineWidth = width
//         ctx.strokeStyle= color
//         ctx.moveTo((index)*width+(width/2), canvas.canvas.height-(props.data[index]*heightMult));
//         ctx.lineTo((index)*width+(width/2), canvas.canvas.height);
//         //ctx.closePath()
//         ctx.fill()
//         ctx.stroke();
//         console.log("sleeping in draw")
//         sleep(1000)
//     }

//     const drawBar1 = (color:string, index:number, props.dataSet:Array<number>) =>{

        

//         const c = document.getElementById("myCanvas");
//         var ctx = c.getContext("2d");
//         ctx.beginPath();
//         ctx.lineWidth = width
//         ctx.strokeStyle= color
//         ctx.moveTo((index)*width+(width/2), canvas.canvas.height-(props.dataSet[index]*heightMult));
//         ctx.lineTo((index)*width+(width/2), canvas.canvas.height);
//         ctx.closePath()
//         ctx.stroke();
//     }

//     const clearGraph = () =>{
//         const c = document.getElementById("myCanvas");
//         const context = c.getContext('2d');
//         context.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
//     }

//     const initGraph = () => {

//         console.log("initGraph called")
//         //clear canvas
//         clearGraph()
//         // const c = document.getElementById("myCanvas");
//         // const context = c.getContext('2d');
//         // context.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    
//         // itorate through props.dataset and add each element to graph
//         for(let i=0; i<props.data.length; ++i){
//             drawBar("grey", i)
//         }
//     }

//     // utilty function

//     const sleep = (duration:number) => {
//         var start = new Date().getTime();
//         for (var i = 0; i < 1e7; i++) {
//           if ((new Date().getTime() - start) > duration){
//             break;
//           }
//         }
//     }


//     // sorting algo calls
    
//     const bubble = () =>{
//         console.log("bubble called")
//         bubbleSort1()
//         // //initGraph()
//         // clearGraph()
//         // drawBar("red",2)
//     }

//     const bubbleSort1 = () =>{
//         var data1 = props.data

//         for(let i = data1.length; i >= 0; i--){
//             for(let j = 0; j < i-1; j++){

//                 // show selcted elements in color
//                 console.log("before graph clear and redraw", heightMult, width)
//                 //clearGraph()
//                 sleep(1000)
//                 drawBar("red", j)
//                 drawBar("blue", j+1)
//                 console.log("after graph clear and redraw")
//                 sleep(1000)
                


//                 // compare two neighboring vales from left to right
//                 // if value on the left(lower index) is greater than right(one with higher index)
//                 // swap places
//                 if(data1[j]>data1[j+1]){
//                     console.log("test", data1[j])
//                     // draw selected bars in diftrent colors


//                     //hold value for props.data[j+1]
//                     var holdLower = data1[j+1]
//                     data1[j+1] = data1[j]
//                     data1[j] = holdLower

//                     //initGraph()
                    
//                     // context.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
//                     // // itorate through props.dataset and add each element to graph
//                     // for(let k=0; k<data1.length; ++k){
//                     //     drawBar1("grey", k, data1)
//                     // }
//                 }
//                 // else move to next set
//             } 
//         }
//         // props.data.setprops.DataSet(data1)
//     }

//     return(
//         <div>
//             <canvas
//             className='border-4 rounded border-black'
//             id="myCanvas" 
//             width={canvas.canvas.width} 
//             height={canvas.canvas.height}>

//             </canvas>
//             <button onClick={testFunctions}> test function</button>
//             <button onClick={bubble}>bubble sort</button>

//         </div>
//     )
// }


/**
 * graph that uses div insted of a canavas
 * each bar will be its own componet
 * @returns 
 */

function graph(props:{data:Array<Number>,parent:string,}) {


    // const props.data = useContext(props.dataContext)

    const [hMult, setHMult] = useState(0)

    //const [color, setColor] = useState(0)

    var color:number = 0
    var index1 = 0
    var index2 = 0
    var next = false
    var finish = false

    useEffect(()=>{
        if(props.data.length > 0){
            
            init()
            //console.log("graph init rerun")
        }
        console.log("graph init rerun", props.data)

        // set index variables
        index1 = props.data.length -1
        index2 = 0

    },[props.data.length, hMult, props.data])

    const getWidth = () =>{
        console.log(document.getElementById("graph"+props.parent)?.offsetWidth)
    }

    const getHMult = () =>{
        const height:number = document.getElementById("graph"+props.parent)?.offsetHeight!
        setHMult(getBarHeightMultipyer(height, props.data))

    }

    // utilty function

    const sleep = (duration:number) => {
        var start = new Date().getTime();
        for (var i = 0; i < 17; i++) {
          if ((new Date().getTime() - start) > duration){
            break;
          }
        }
    }


    const init = () =>{
        
        
        const height:number = document.getElementById("graph"+props.parent)?.offsetHeight!
        console.log("graph init is now running", height, props.data);
        setHMult(getBarHeightMultipyer(height, props.data))
    }

    // const test = () =>{
    //     var pause = true
    //     document.getElementById("bar0").style.backgroundColor = "blue";
    //     document.getElementById("bar1").style.backgroundColor = "red";
    //     var props.dataHold = [...props.data]
    //     props.dataHold[0] = 50
    //     props.dataHold[1] = 40
    //     props.data.setprops.DataSet(props.dataHold)
    //     setTimeout(()=>{
    //         document.getElementById("bar0").style.backgroundColor = "grey";
    //         document.getElementById("bar1").style.backgroundColor = "grey";
    //         pause = false
    //     }, 1000)
    // }

    const test = () =>{
        console.log("next: ", next, ", index2: ", index2, ", index1: ", index1, ", length: ",  props.data.length)
        if(index2 < props.data.length){
            
            if(next === false)
                bubbleOuter()
            else
                bubbleInner()
        }
        
    }

    // bubble sort brokend down by parts 

    const bubbleOuter = () =>{
        console.log("outer")
        console.log(index1)
        if(index1 > 0){
            index2 = 0
            bubbleInner()      
        }
        else{
            console.log("finished")
        }
    }

    const bubbleInner = () =>{
        console.log("inner")
        if(index2 < index1 ){
            next = true
            
            document.getElementById("bar"+(index2).toString()+props.parent).style.backgroundColor = "blue";
            document.getElementById("bar"+(index2+1).toString()+props.parent).style.backgroundColor = "red";
            setTimeout(() => {
                if(props.data[index2]> props.data[index2+1]){
                    let hold = props.data[index2]
                    props.data[index2] = props.data[index2+1]
                    props.data[index2+1] = hold
                    props.data.setprops.DataSet([...props.data])
                    console.log("index: ", props.data[index2], ", index+1: ", props.data[index2+1])
                }
                    
                document.getElementById("bar"+(index2).toString()+props.parent).style.backgroundColor = "grey";
                document.getElementById("bar"+(index2+1).toString()+props.parent).style.backgroundColor = "grey";
                index2++
            }, 1000);
            
        }
        else{
            console.log("set to false")
            next = false
            index1--
        }
    }

    const testHandler = () =>{
        setInterval(test1, 2000)
    }

    const test1 = () =>{
        if(color === 0){
            console.log("color is 0")
            document.getElementById("bar0").style.backgroundColor = "blue";
            color = 1
        } else{
            console.log("color is 1")
            document.getElementById("bar0").style.backgroundColor = "red";
            color = 0
        }
            
    }


    /**
     * 
     * @param i index of frst element to be compared
     * @param j index of second element to be compared
     */
    const bubbleSort = () =>{
        var data1:Array<number> = props.props.data
        console.log("bubbleSort running")

        for(let i = data1.length; i >= 0; i--){
            for(let j = 0; j < i-1; j++){

                
                
                // swap places if value at lower index is larger
                if(data1[j]>data1[j+1]){
                    console.log("props.data at j: ", data1[j])
                    console.log("props.data at j+1: ", data1[j+1])
                    //place holder var
                    var hold:number = data1[j]
                    data1[j] = data1[j+1]
                    data1[j+1] = hold
                    console.log("props.data at j: ", data1[j])
                    console.log("props.data at j+1: ", data1[j+1])
                }
            }
        }
        console.log("bubbleSort finished")
        console.log(data1)
        console.log(props.data)
    }
    

    return(
        <div className="w-full">
            <div id={"graph"+props.parent} 
            className="w-full h-96 border-4 rounded-md border-black bg-zinc-800 flex px-1"
            > 
                {
                    props.data.map((val:number, i:number)=>(
                         <Bar color="grey" hMult={hMult} val={val} index={i} gp={props.parent}/>
                    ))
                }
            </div>
            
        </div>
        
    )
}




export default graph