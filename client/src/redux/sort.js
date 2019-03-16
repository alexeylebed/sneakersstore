
export const lowToHigh = (arr) => {
    for(let i = 0; i < arr.length-1; i++){
        if(arr[i].price > arr[i+1].price){
            let temp1= arr[i];
            let temp2 = arr[i+1]
            arr[i] = temp2;
            arr[i+1] = temp1;
            i = -1;
        }
    }
    return arr;
}

export const highToLow = (arr) => {
    for(let i = 0; i < arr.length-1; i++){
        if(arr[i].price < arr[i+1].price){
            let temp1= arr[i];
            let temp2 = arr[i+1]
            arr[i] = temp2;
            arr[i+1] = temp1;
            i = -1;
        }
    }
    return arr;
}

export const defaultSort = (arr) =>{
    return arr.sort()
}
