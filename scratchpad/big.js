const stringit = require("../lib");

const notEmpty = {
    data: function() {
        this.farts = true;
    },
};


const result = stringit(notEmpty);
console.log(result);
