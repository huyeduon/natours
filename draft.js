const { create } = require('./models/tourModel');

function greet(greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = greet('Hello');
const sayHai = greet('Hi');

sayHello('Alice');
sayHai('Bob');

// Closure
function createCounter() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const counter1 = createCounter();
const counter2 = createCounter();
counter1();
counter1();

counter2();
counter1();

// Factory function

function createLengthValidator(minLength) {
  return function (value) {
    return value.length >= minLength;
  };
}

const validateUsername = createLengthValidator(5);
const validatePassword = createLengthValidator(8);

console.log(validateUsername('john'));
console.log(validateUsername('johndoe'));

console.log(validatePassword('short'));
console.log(validatePassword('verysecuredpassword'));
