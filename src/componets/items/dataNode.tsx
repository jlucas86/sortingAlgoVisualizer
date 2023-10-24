import { useState, useEffect, useContext } from "react";

import { dataContext } from "../../contexts/dataContext";

function dataNode(props:{val:number,index:number}) {

    const [newVal, setNewVal] = useState<number>()
    const [editStyle, setEditStyle] = useState({display:"none"})

    const data = useContext(dataContext)
    
    // updates the data set with new array *done like this to cause rerender*
    const handleDelete = () => {
        var hold = data.dataSet.slice()
        hold.splice(props.index,1)
        data.setDataSet(hold)
    }

    // makes the text box and button for submitting value edits visable
    const handleEdit = () => {
        setEditStyle({display:"block"})
    }

    // handles changes to newVal
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setNewVal(e.target.value)
    }

    //update value at index with newVal
    const updateValue = () => {
        var hold = data.dataSet.slice()
        hold[props.index] = Number(newVal)
        data.setDataSet(hold)
        setEditStyle({display:"none"})
    }

    // update when "Enter key is pressed"
    const handleEnter = (e) =>{
        if(e.key === "Enter"){
            updateValue()
        }
    }


    /**
     * style 
     * delete button will be a minus sine
     * edit button will be a pencil 
     * maybe make whole thing a flex box
     */
    
    return (
        <div >
            <h4> {props.val} </h4>
            <button onClick={handleDelete} title="Delete">Delete</button>
            <button onClick={handleEdit} title="Edit">
                Edit   
            </button>
            
            <div style={editStyle}>
                <input type="number"
                    onChange={handleChange}
                    onKeyPress={handleEnter}
                    id="dataSetValue" 
                    name="dataSetValue"/>
                <button onClick={updateValue}>Update</button>
            </div>
            
        </div>
    )
}

export default dataNode