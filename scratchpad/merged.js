const stringit = require("../lib");
const requireFromString = require("require-from-string");
const notEmpty = {
    data: function() {
        return {
            msg: "Hello world!",
            messageOuter: "Say Foo",
        };
    },
};

function FixData(oldData, newData) {
    const mergedData = Object.assign({}, oldData, newData);
    const func = `module.exports = function data() { return ${stringit(mergedData)}; };`;
    const required = requireFromString(func);
    return required;
}

const fixedData = FixData(notEmpty.data(), {foo: true});
notEmpty.data = fixedData;
const result = stringit(notEmpty);
// tslint:disable-next-line:no-console
console.log(result);
