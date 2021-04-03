let num = 266219;
let sum = 1;

let arr = num.toString().split(''); // приводим к строке и разделяем в массив

for(let i = 0; i < arr.length; i++) {
  sum *= arr[i];
}
console.log(sum);
sum = sum ** 3;

console.log(sum.toString().slice(0, 2));