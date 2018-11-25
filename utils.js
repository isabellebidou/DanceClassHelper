function addZero(x, n) {
    if (x.toString().length < n) {
         x = "0" + x;
    }
    return x;
}

module.exports = {
    addZero: addZero
    
}