"use strict";
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
                const stringifiedInner = functionToString(element);
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
 * @param {Object} options
 * @returns {String}
 */
function functionToString(script, options) {
    "use strict";
    let scriptString = "";
    if (script.length === 0 && options  && options.execFuncs) {
        for (let index = 0; index < options.execFuncs.length; index++) {
            const element = options.execFuncs[index];
            if (element === script.name) {
                try {
                    const scriptOpened = script();
                    if (scriptOpened && scriptOpened !== "") {
                        const returnObject = objectToString(scriptOpened, options);
                        scriptString = `function ${script.name}() { return ${returnObject}; }`;
                    } else {
                        scriptString = String(script);
                    }
                } catch (error) {
                    scriptString = String(script);
                }
            } else {
                scriptString = String(script);
            }
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

    return scriptString;
}

/**
 *
 * @param {Object} script
 * @param {Object} options
 * @returns {String}
 */
function objectToString(script, options) {
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
                            objectString += `"${member}":${functionToString(element, options)}${isLastElement(script, member)}`;
                            break;
                        case "object":
                            objectString += `"${member}":${objectToString(element, options)}${isLastElement(script, member)}`;
                            break;
                        default:
                            objectString += `"${member}":${JSON.stringify(element)}${isLastElement(script, member)}`;
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
 * @param {Object} [options={}]
 * @returns {String}
 */
function scriptToString(script, options) {
    if (!options) { options = {}; }
    let scriptString = "";
    switch (typeof script) {
        case "function":
            scriptString += functionToString(script, options);
            break;
        case "object":
            const objectString = objectToString(script, options);
            scriptString += objectString;
            break;
        default:
            scriptString += String(script);
    }

    let finalScriptString = `${scriptString}`;
    return finalScriptString;
}

module.exports.scriptToString = scriptToString;
