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
            case "object":
                const inner = objectToString(element);
                arrayString += inner;
                break;
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
    return xss(arrayString);
}

/**
 * @param {Function} script
 * @returns {String}
 */
function functionToString(script) {
    let scriptString = "";
    if (script.length === 0) {
        try {
            const scriptOpened = script();
            const returnObject = objectToString(scriptOpened);
            if (returnObject && returnObject !== "") {
                scriptString = `function ${script.name}() { return ${returnObject}; }`;
            } else {
                scriptString = String(script);
            }
        } catch (error) {
            scriptString = String(script);
        }
    } else {
        if (script.name) {
            switch (script.name) {
                case "String":
                case "Number":
                case "Boolean":
                case "Object":
                case "Function":
                    scriptString = script.name;
                    break;
                default:
                    scriptString = String(script);
                    break;
            }
        } else {
            scriptString = String(script);
        }
    }

    return xss(scriptString);
}

/**
 *
 * @param {Object} script
 * @returns {String}
 */
function objectToString(script) {
    let scriptString = "";
    if (!script) {
        scriptString = "null";
    } else {
        if (script.constructor === Array) {
            let arrayString = arrayToString(script);
            scriptString = `[${arrayString}]`;
        } else {
            let objectString = "";
            for (let member in script) {
                if (script.hasOwnProperty(member)) {
                    const element = script[member];
                    switch (typeof element) {
                        case "function":
                            objectString += member + ": " + functionToString(element) + isLastElement(script, member);
                            break;
                        case "object":
                            objectString += member + ": " + objectToString(element) + isLastElement(script, member);
                            break;
                        default:
                            objectString += member + ": " + xss(JSON.stringify(element)) + isLastElement(script, member);
                            break;
                    }
                }
            }
            scriptString = `{${objectString}}`;
        }
    }

    return scriptString;
}

/**
 * ScriptToString
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
            const objectString = objectToString(script);
            scriptString += objectString;
            break;
        default:
            scriptString += String(script);
    }

    let finalScriptString = `${scriptString}`;
    return finalScriptString;
}

module.exports.scriptToString = scriptToString;
