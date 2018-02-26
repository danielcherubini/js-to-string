const stringit = require("./lib");

function bar(value) {
    let thing = true;
    let array = [1, 2, 3, 4, 5];
    if (!value) {
        thing = false;
    }
    return thing;
}

const foo = {
    bar: bar,
};

const big = {
    mixins: [bar],
    components: {
        foo,
    },
    data: function() {
        return {
            user: false,
            currentModifier: "STANDARD",
            currentProduct: 0,
        };
    },
    methods: {
        selectModifier: function(newModifier) {
            this.currentModifier = newModifier;
        },
        successHandler: function(response) {
            this.location = response.url;
        },
        errorHandler: function(error) {
            this.error = error;
        },
        hideError: function() {
            this.error = "";
        },
    },
};

const bool = true;
const str = "hello";
const arr = [1, 2, 3, 4, 5];

const result1 = stringit(foo);
const result2 = stringit(bar);
const result3 = stringit(bool);
const result4 = stringit(arr);
const result5 = stringit(big);

console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);
console.log(result5);
