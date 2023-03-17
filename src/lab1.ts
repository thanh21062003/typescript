const arr1 = [1, 2, 3, 4, 5];
const arr4 = ['a', 'b', 'c', 'd', 'e'];
 function sortInfo<T>(arr: T[], callback:(a:T , b:T) => number):T[]{
    for(let i = 0; i < arr.length; i++){
        for(let j = i + 1; j < arr.length; j++){
            if(callback(arr[i], arr[j]) < 0){
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }   
    }
    return arr;
 }
sortInfo(arr4, (a, b) => a<b? -1 : 1);
// sortInfo(arr4, (a, b) => a.localeCompare(b));
console.log(arr1);
console.log(arr4);