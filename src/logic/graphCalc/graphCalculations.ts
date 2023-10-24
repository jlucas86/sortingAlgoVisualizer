import { useContext } from "react";

// contexts
import { dataContext } from "../../contexts/dataContext";
import { canvasContext } from "../../contexts/cavasContext";



export function getBarWidth(width:number, dataSetSize:number):number {
    return(width/dataSetSize)
}

export function getBarHeightMultipyer(height:number, dataSet:Array<number>) {
    const heightMult:number = (height-20)/(Math.max(...dataSet))
    return (heightMult)
}


