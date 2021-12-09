// Deletes item from localStorage
function arrayRemove(arr, value) {
    return arr.filter(function(ele) {
        return ele != value;
    });
}