// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

//Polyfill for string.contains prototype, found in Harmony ECMAScript 6 proposal.
//See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains
//Could have defined a standalone function but this is cleaner.
if (!String.prototype.contains) {
    String.prototype.contains = function() {
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}

var getElementsByClassName = function(targetClass, element){
    var element = element || document;
    var result = []; //Returns empty array (which concats into nothing) if targetClass isn't found
   
    //If the target class applies to the current element, push the element
    //to the results array
    if (element.className && element.className.contains(targetClass)) {
        result.push(element);
    } 

    //If the current element has children, make recursive calls to all of its
    //children and concatenate the results with the main results array.
    if (element.hasChildNodes()) {
        var children = element.childNodes;
        for (var i = 0; i < children.length; i++) {
            result = result.concat(getElementsByClassName(targetClass, children[i]));
        }
    } 
    return result;
};

//Personal Notes:
//In the recursive call, we're always concatenating either an array with a single element inside when the target class is found or an empty array when it isn't. We concatenate ALL of these to the initial result array; the empty arrays disappear, leaving us with one array containing only the matching elements. 
//Children of elements that match our target class are ignored, as the parent class is immediately returned.


