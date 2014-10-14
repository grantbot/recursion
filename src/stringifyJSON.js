// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj, index) {
    var result = ""; 
    //Handle Strings
    if (typeof obj === "string") {
        return '"' + obj + '"';
    } 
    
    //Handle Arrays
    var index = index || 0;
    if (Array.isArray(obj) === true) {
        if (index >= obj.length) {
            return "[]";
        }
        
        result = stringifyJSON(obj[index]);

        if (index < obj.length - 1) {
            result = result + "," + stringifyJSON(obj, index + 1);
        }
       
        if (index === 0) {
            return "[" + result + "]"
        };

        return result;
    } 
    
    //Handle Objects
    if (typeof obj === 'object' && obj !== null) {
        
    } 

    else {
        console.log('return2');
        return result + obj; 
    }
};
