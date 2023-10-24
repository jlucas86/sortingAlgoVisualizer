import { useState, useEffect, useContext } from "react";

function bar(props:{ val:number, index:number, hMult:number, color:string, gp:string}){

    const [barStyle, setBarStyle] = useState({})
    const [index, setIndex] = useState("")

    useEffect(()=>{
        init()
    },[props.hMult, props.val])

    const init = () =>{
        const height = props.val*props.hMult
        setBarStyle({marginTop:"auto", width:"100%", border:"solid", borderRadius:"5px", borderColor:"black", backgroundColor:props.color, height:height.toString().concat("px")})
        setIndex("bar".concat(props.index.toString()))
    }


    return(
        <div id={index+props.gp} style={barStyle} >
            
        </div>
    )
}

export default bar