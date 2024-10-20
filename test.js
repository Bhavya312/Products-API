//print date and time in javascript
const displayTime = () => {
var today = new Date();
var day = today.getDay();

const daylist = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thirsday', 'Friday', 'Saturday'];

var hour = today.getHours();
var minute = today.getMinutes();
var second = today.getSeconds();

var prepand = (hour >= 12) ? "PM" : "AM";
console.log(prepand);

if(hour === 0 && prepand == "PM")
  {
    if (minute === 0 && second === 0){
      hour = 12;
      prepand = "Noon";
    } else {
      hour = 12;
      prepand = "PM";
    }
  }

if(hour === 0 && prepand == "AM")
  {
    if (minute === 0 && second === 0){
      hour = 12;
      prepand = "Midnight";
    } else {
      hour = 12;
      prepand = "AM";
    }
  }

    console.log(`current time ${hour} ${prepand} ${minute} ${second}`)
  }

  // setInterval(displayTime, 1000)

//count the factorial using recursive method
function defRecursive(n) {
  if(n === 0) { return 1; }
      return n * defRecursive(n - 1);
}

console.log(defRecursive(5));

const integerBetween = (a, b) => {
      if(b - a === 2){
        return [a + 1];
      }
      else{
        var list = integerBetween(a, b - 1);
        list.push(b - 1);
        return list;
      }
}

console.log(integerBetween(2, 8));


const exponentA = (a, b) => {
  if(b === 0) { return 1; }
    return a * exponentA(a, b - 1);
}

console.log(exponentA(5, 4));


const fibonachi = (a) => {
  if( a <= 1) { return [0, 1];}
  else{

    var s = fibonachi(a - 1);
    console.log(a-1);
    console.log(s.length);
    s.push(s[s.length - 1] + s[s.length - 2]);
  
    return s.slice(0, a);
  }

}

console.log(fibonachi(6));