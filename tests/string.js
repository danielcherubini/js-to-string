const test = require("ava");
const stringit = require("../lib");

test("Function", t => {
    function foo(value) {
        let thing = true;
        if (!value) {
            thing = false
        }
        return thing;
    }
    const result = stringit(foo);
    console.log(result)
});