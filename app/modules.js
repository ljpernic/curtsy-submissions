// app/modules.js
//
// Every file in node is a module!
//A module is an encapsulated piece of code that shares a minumum
//
//
//////The actual logic of the calculation that gets called into the other file...
//
function sum (arr) {
    return arr.reduce(function(a, b) { 
      return a + b
    }, 0)
  }
  //
  module.exports.sum = sum


function isBiggerThanTwo (num) {
  return num > 2
}
    module.exports.isBiggerThanTwo = isBiggerThanTwo