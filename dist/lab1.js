var arr1 = [1, 2, 3, 4, 5];
var arr4 = ['a', 'b', 'c', 'd', 'e'];
function sortInfo(arr, callback) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (callback(arr[i], arr[j]) < 0) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
sortInfo(arr4, function (a, b) { return a < b ? -1 : 1; });
// sortInfo(arr4, (a, b) => a.localeCompare(b));
console.log(arr1);
console.log(arr4);