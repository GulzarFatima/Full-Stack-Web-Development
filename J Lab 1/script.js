
// Blocking code example
console.log("start of blocking code");
for (let i = 0; i < 10; i++) {
}
console.log("end of blocking code");// will not run until loop finishes

// Non-blocking code example
console.log("start of non-blocking code");

setTimeout(() => {
    console.log("inside setTimeout");
    }, 0);
    
console.log("end of non-blocking code");
//setTimeout is non-blocking,
// it will not block the execution of the code below it.