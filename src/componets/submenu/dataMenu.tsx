import { FormEventHandler, useState, useEffect } from "react"


function dataMenu(props:{dataSet:Array<number>, setDataSet:Function}){

    const [showFile, setShowFile] = useState({display:"none"})
    const [showRandom, setShowRandom] = useState({display:"none"})
    const [showManual, setShowManual] = useState({display:"none"})
    
    
    const [randDataSize, setRandDataSize] = useState(10)
    const [file, setFile] = useState()
    const [manualEntryData,setManualEntryData] = useState()

    const handleInputTypeChange = (e: React.FormEvent<HTMLInputElement>) =>{
        if(e.target.value === 'file'){ 
            setShowFile({display:"block"})
            setShowRandom({display:"none"})
            setShowManual({display:"none"})
        } else if (e.target.value === 'random'){
            setShowFile({display:"none"})
            setShowRandom({display:"block"})
            setShowManual({display:"none"})
        } else{
            setShowFile({display:"none"})
            setShowRandom({display:"none"})
            setShowManual({display:"block"})
        }
    }

    const handleDataSetSizeChange = (e: React.FormEvent<HTMLInputElement>) =>{
        setRandDataSize(Number(e.target.value))
    }

    const handleRandNumGen = () =>{
        
        // temp holder values
        var data:Array<number> = []

        // generate an array of the correct size
        for(var i=0; i<randDataSize; ++i){
           data.push(Math.random()*100)
        }

        // set dataset equal to new data
        props.setDataSet(data)

    }

    const handleInputDataChange = (e: React.FormEvent<HTMLInputElement>) =>{
        setManualEntryData(e.target.value)
    }

    const handleInputdata = () => {
        // put new value in it's own array
        // then combined that array with the data set array and save it as a new array
        // then update dataSet value with new array
        const holdValue = [Number(manualEntryData)]
        const holdArray = props.dataSet.concat(holdValue)
        props.setDataSet(holdArray)
    }

    // fuctions to handle "Enter" key press in data text boxes
    const handleEnterRand = (e) =>{
        if(e.key === "Enter"){
            handleRandNumGen()
        }
    }

    const handleEnterMan = (e) =>{
        if(e.key === "Enter"){
            handleInputdata()
        }
    }



    // use to check the valuses of state elements
    useEffect(()=>{
        
    }, [])

    return (
        <div className="text-center  border-black">
            <h3>Data</h3>
            <div>
                <h4> Source Of Data</h4>
                <div className="text-left pb-1" id="radioButtons" onChange={handleInputTypeChange}>
                    {/* <input type="radio" value="file" name="inputType"/>
                    <label >selsect data from file</label><br></br> */}
                    <input type="radio" value="random" name="inputType"/>
                    
                    <label >randomly generate data</label><br></br>
                    <input type="radio" value="manual" name="inputType"/>
                    <label >Enter Data Manualy</label><br></br>
                </div>

                <div id="dataInput" className="text-left">
                    <div id="fileDataEntry" style={showFile} className="my-1">
                        Select a file (file type must be csv)
                        <br></br>
                        <input  type="file"/>
                    </div>
                    <div id="randomDataEntry" style={showRandom}>
                        select the size of data set
                        <br></br>
                        <input 
                            className="my-1 bg-zinc-600 font-semibold"
                            type="number" 
                            onChange={handleDataSetSizeChange} 
                            id="dataSetSize"   
                            name="dataSetSize" 
                            onKeyPress={handleEnterRand}
                            value={randDataSize}/>
                        <button id="rDataEnter" onClick={handleRandNumGen}> Enter</button>
                    </div>
                    <div id="manualDataEntry" style={showManual}>
                        <input 
                            className="my-1 bg-zinc-600 font-semibold"
                            type="number"
                            onChange={handleInputDataChange}
                            id="dataSetValue" 
                            onKeyPress={handleEnterMan}
                            name="dataSetValue" />
                        <button id="mDataEnter" onClick={handleInputdata}> Enter</button>
                    </div>
                </div>
                

            </div>
        </div>
    )
}

export default dataMenu