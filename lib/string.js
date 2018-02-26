// @ts-check
const xss = require("xss");

/**
 *
 * @param {Object | *} script
 * @param {String} currentElement
 * @returns {String}
 */
function isLastElement(script, currentElement) {
    const elementArray = Object.keys(script);
    const lastElement = elementArray[elementArray.length - 1];

    if (currentElement === lastElement) {
        return "";
    } else {
        return ",";
    }
}

/**
 * @param {any[]} array
 * @returns {String}
 */
function arrayToString(array) {
    let arrayString = "";
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (index > 0) { arrayString += ","; }
        switch (typeof element) {
            case "function":
                const stringifiedInner = String(element);
                arrayString += stringifiedInner;
                break;
            case "number":
                arrayString += element;
                break;
            default:
                arrayString += `"${String(element)}"`;
                break;
        }
    }
    return arrayString;
}

/**
 * @param {Function} script
 * @returns {String}
 */
function functionToString(script) {
    let scriptString = String(script);
    return scriptString;
}

/**
 *
 * @param {Object} script
 * @returns {String}
 */
function objectToString(script) {
    let scriptString = "";
    if (script.constructor === Array) {
        let arrayString = arrayToString(script);
        scriptString += arrayString;
        return `[${scriptString}]`;
    } else {
        for (let member in script) {
            if (script.hasOwnProperty(member)) {
                const element = script[member];
                switch (typeof element) {
                    case "function":
                        scriptString += member + ": " + functionToString(element) + isLastElement(script, member);
                        break;
                    case "object":
                        scriptString += member + ": " + objectToString(element) + isLastElement(script, member);
                        break;
                    default:
                        scriptString += member + ": " + JSON.stringify(element) + isLastElement(script, member);
                        break;
                }
            }
        }
        return `{${scriptString}}`;
    }
}

/**
 * @constructor
 * @param {(Object|*)} script
 * @returns {String}
 */
function scriptToString(script) {
    let scriptString = "";
    switch (typeof script) {
        case "function":
            scriptString += functionToString(script);
            break;
        case "object":
            scriptString += objectToString(script);
            break;
        default:
            scriptString += String(script);
    }

    let finalScriptString = `${scriptString}`;
    return finalScriptString;
}

module.exports.scriptToString = scriptToString;
