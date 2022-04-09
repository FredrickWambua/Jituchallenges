// BDD
// range 1 to 100
// if any character on the range is divisible by 3, substitute by printing Fuzz
// if any character on the range is divisible by 5, substiute it by printing Buzz
// if any character on the range is divisible by 3 and 5, substitute it by printing FizzBuzz
// use forEach, tenery operator, switch case, map, filter, reduce.

for ( var i = 1; i <= 100; i++) {
    if (i % 3 == 0 && i % 5 == 0){
        console.log('FIZZBUZZ');
    }
    else if (i % 3 == 0){
        console.log('FIZZ');
    }
    else if (i % 5 == 0){
        console.log('BUZZ');
    }
    else {
        console.log(i)
    }
}

// BDD
// define a funtion with two arguments, num and target
// check which two intergers in nums when added the answer is equal to the targer
// return the indices of those numbers
// if they match, print the number

let addTo = (num, target)=>{
    for (i =0; i<=num.length; i++){
        
    }
}

// 3 BDD
// declare an array
// convert to string declare that as a variable in coversiton
// split the variable string and reverse then join and declare it as a variable
// check if the reversed string matches the converted number to string
// research anagram
function palindrome(x){
    let xIsString = x.toString();
    let xIsReversed = xIsString.split('').reverse().join('');
    if (xIsReversed == xIsString){
        return true;
    } else {
        return false;
    }
    }
    

// define the function and pass the numbers as an argument(rest parameters)
// writ a for loop to indicate the length of the numbers
// assign a variable that displays the total sum
let sum = 0;
function sumOfNumbers(...numbers){
    for (i =0; i < numbers.length; i++){
        sum += numbers[i];
    }
    return sum;
}
