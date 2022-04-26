// class FourthYearStudent {
//     constructor(name, age, units){
//         this.name = name;
//         this.age = age;
//         this.units= units;
//     }
//     static getYearOfStudy(){
//         return 4;
//     }
//     getStudentAge(){
//         return this.age
//     }
// }

// let fredrick = new FourthYearStudent('Fred', 18, ['Maths', 'English', 'Science'])
// console.log(fredrick)
// console.log(FourthYearStudent.getYearOfStudy())

// console.log(fredrick.getStudentAge());



// let person = {
//     fname : 'Fredrick',
//     lname : 'Wambua'
// }
// First, use a function expression to define a function and assign it to the greet property of the person object.
// Then, call the method greet() method.
// function greet(){
//     console.log(`Hello ${person.fname} ${person.lname}`)
// }
// person.greet = greet;
// person.greet()

// Object method shorthand
// js allows onr to use define methods of an object using the object literal syntax

// let person = {
//     fname : 'Fredrick',
//     lname : 'Wambua',
//     greet (){
//         return 'Hello'
//     }
    
// }
// console.log(`${person.greet()} ${person.fname} ${person.lname}`)

function add (x,y){
    return x+y;
}
res = add(4,3);
console.log(res)

