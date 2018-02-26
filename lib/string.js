// @ts-check
const xss = require("xss");

class PropClass {
    /**
     *
     * @param {*} prop
     * @property {*} type
     * @property {Boolean} required
     * @property {*} default
     */
    constructor(prop) {
        if (prop.required) {
            this.required = prop.required;
        }
        if (prop.default) {
            this.default = prop.default;
        }
    }
}

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
 *
 * @param {Object[]} routes
 * @returns {String}
 */
function routesToString(routes) {
    let routeString = "";
    const lastRoute = routes[routes.length - 1];
    routes.forEach(route => {
        if (route !== lastRoute) {
            routeString += scriptToString(route) + ",";
        } else {
            routeString += scriptToString(route);
        }
    });
    return `[${routeString}]`;
}

/**
 *
 * @param {object} script
 * @returns {String}
 */
function routeComponentsToString(script) {
    let componentString = "";
    for (const member in script) {
        if (script.hasOwnProperty(member)) {
            const element = script[member];
            componentString += member + ": __" + element + isLastElement(script, member);
        }
    }
    return `{${componentString}}`;
}

/**
 *
 * @param {Object[]} mixins
 * @returns {String}
 */
function mixinsToString(mixins) {
    var mixinString = "";
    for (var mixin of mixins) {
        mixinString += `${scriptToString(mixin)},`;
    }
    return mixinString;
}

/**
 *
 * @param {object} props
 * @returns {String}
 */
function propsToString(props) {
    let propString = "";
    if (props[Object.keys(props)[0]].type === null) {
        var propsArray = Object.keys(props);
        propString = xss(JSON.stringify(propsArray));
    } else {
        let tempProp = {};
        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                var element = new PropClass(props[prop]);
                tempProp[prop] = element;
            }
        }
        propString = scriptToString(tempProp);
    }
    return propString;
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
        scriptString += arrayString
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
            scriptString += String(script)
    }
    
    let finalScriptString = `${scriptString}`;
    return finalScriptString;
}

module.exports.scriptToString = scriptToString;
module.exports.mixinsToString = mixinsToString;
module.exports.routesToString = routesToString;
module.exports.routeComponentsToString = routeComponentsToString;
