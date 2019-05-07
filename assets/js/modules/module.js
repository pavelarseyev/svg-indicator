
// these properties will be available from anywhere via this.property
export const constants = {
    isTouch: "ontouchstart" in window ? function () {document.body.classList.add("touch"); return true;}() : function () {document.body.classList.add("no-touch"); return false;}(),
    body: $("body")
};

// these functions won't run at once, but will be available from anywhere via this.functionName
export const staticFunctions = {
    sparedFunction() {
        console.log("spareFunction executed");
    },
    anotherSparedFunction(arg) {
        console.log(`anotherSpareFunction executed with args: ${arg}`);
    }
};

// runs at once. runs on all pages because of bound with 'body' selector
export function commonFunction() {
    console.log("window was loaded");
    // isTouch is available from anywhere via this.isTouch
    console.log(`is touch: ${this.isTouch}`);
}

// runs at once. runs on all pages because of bound with 'body' selector
export function anotherCommonFunction() {
    window.addEventListener("resize", () => {
        setTimeout(() => {
            console.log("window was resized");
        },500);
    });
}

// runs at once. runs on any page, where .header selector can be found
export function navFunction() {
    console.log("navFunction executed");
    // body is available from anywhere via this.body
    console.log("body height:", this.body.height());
    // static function is available from anywhere via this.functionName
    this.anotherSparedFunction("myArg");
}

// test for tree shaking
// we can import this function and not use it
// uglifier will clean it up from minified code
export function myUnusedFunction(val) {
    return "foo" + val;
}