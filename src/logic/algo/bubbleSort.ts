
export function bubbleSort( dataSet:Array<number>, setDataSet:Function) {

    // holder array that will 
    var data = dataSet

    for(var i = data.length; i >= 0; i--){

        for(var j = 0; j < i-1; j++){
            // compare two neighboring vales from left to right
            // if value on the left(lower index) is greater than right(one with higher index)
            // swap places
            if(data[j]>data[j+1]){
                //hold value for data[j+1]
                var holdLower = data[j+1]
                data[j+1] = data[j]
                data[j] = holdLower
            }
            // else move to next set
        } 
    }

    setDataSet(data)
}