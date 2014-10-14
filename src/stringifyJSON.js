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

    //Passing an index in as an argument lets us implement for-loop-like behavior
    //while retaining that pure recursive goodness. Cuz why not. 
    var index = index || 0;

    if (Array.isArray(obj) === true) {
        //Handle empty array 
        if (obj.length === 0) {
            return "[]";
        }
        
        //Array isn't empty, so stringify the current item
        result = stringifyJSON(obj[index]);

        //If there's more to the array, make a recursive call to stringify
        //and append it to the result string
        if (index < obj.length - 1) {
            result = result + "," + stringifyJSON(obj, index + 1);
        }
      
        //Array wasn't empty and we've reached the end of it, so wrap everything
        //in brackets and return. Index === 0 ensures we only wrap after all
        //recursive calls, if any, have finished.
        if (index === 0) {
            return "[" + result + "]"
        };

        //This only gets called to return stringified primitive array elements
        return result;
    } 
    
    //Handle Objects
    if (typeof obj === 'object' && obj !== null) {
        var keys = Object.keys(obj);
        var curr_key = keys[index];

        //Handle empty object
        if (index >= keys.length) {
            return "{}";
        }
       
        //Skip over properties that are functions or undefined
        if (obj[curr_key] === undefined || typeof obj[curr_key] === 'function') {
            return stringifyJSON(obj, index + 1);
        }

        //Stringify current key and value pair
        result = '"' + curr_key + '":' + stringifyJSON(obj[curr_key]); 

        //If there are more properties left, stringify them with a recursive call and
        //append them to the result string
        if (index < keys.length - 1) {
            result += "," + stringifyJSON(obj, index + 1);
        }
        
        //Object wasn't empty and we've reached the end of it, so wrap everything
        //in curly braces and return it. Index === 0 ensures we only wrap after all
        //recursive calls, if any, have finished. 
        if (index === 0) {
            return '{' + result + '}';
        }

        return result;
    } 

    //Handle everything else by appending it to an empty string
    else {
        return result + obj; 
    }
};
