// ES6
'use strict';

const MESSAGE = "Hello World";
const dist = document.getElementById('dist');

let greet = () => {
    console.log(MESSAGE);
    dist.innerHTML = MESSAGE;
  };

greet();