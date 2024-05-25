const numbers = [...document.querySelectorAll(".btn")];
const redo = document.getElementById("redo");
const undo = document.getElementById("undo");
const clear = document.getElementById("clear");
const output = document.getElementById("output");
const undoState = document.getElementById("undoState");
const redoState = document.getElementById("redoState");

let states = [];
let store = [];
let currentState = -1;
reset();

function displayOutput() {
   let txt = "";
   store.forEach((val) => {
      txt += val + " ";
   });
   output.innerText = txt;
}

function displayState() {
   let txt1 = "";
   let txt2 = "";

   states.forEach((store, i) => {
      if (i <= currentState) {
         txt1 += `states[${i}] = [ `;
         store.forEach((val) => {
            txt1 += val + ", ";
         });
         txt1 += "]\n";
      } else {

         txt2 += `states[${i}] = [ `;
         store.forEach((val) => {
            txt2 += val + ", ";
         });
         txt2 += "]\n";
      }
   });
   undoState.innerText = txt1;
   redoState.innerText = txt2;
}

function reset() {
   store = [];
   states = [];
   states.push([...store]);
   currentState = 0;
   displayOutput();
   displayState();
}


numbers.forEach((number, i) => {
   number.addEventListener("click", () => {
      states.splice(currentState + 1, states.length);
      store.push(i);
      states.push([...store]); 
      currentState++;
      displayOutput();
      displayState();
   });
});


redo.addEventListener("click", () => {
   if (currentState < states.length - 1) {
      currentState++;
      store = [...states[currentState]];
      displayOutput();
      displayState();
   }
});

undo.addEventListener("click", () => {
   if (currentState > 0) {
      currentState--;
      store = [...states[currentState]];
      displayOutput();
      displayState();
   }
});

clear.addEventListener("click", reset);