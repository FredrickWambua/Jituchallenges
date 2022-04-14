"use strict";
// class GoodGreeter {
//     name: string;
//     constructor() {
//       this.name = "fred";
//     }
//   }
// let fred = new GoodGreeter();
// console.log(fred);
// FIRST CLASS CONSTRUCTION
// class Student{
//     name:string
//     constructor(n:string){
//         this.name = n;
//     }
//     study(){
//         console.log(this.name + 'is studying');
//         return this.study
//     }
// }
// const pupil = new Student('Fredrick')
// Shorthand initializer
// class Student {
//     constructor(private readonly id:string, private name:string, public place:string){
//     }
//     study(){
//         console.log(`${this.name} is from ${this.place} and his id is ${this.id}.`)
//     }
// }
// let pupil = new Student('id1','Fredrick', 'Nairobi')
// class Carbrand {
//     public name: string;
//     protected yearfounded: number;
//     private recommended: boolean;
//     constructor(name:string, yearfounded: number, reccommended: boolean){
//         this.name = name;
//         this.yearfounded = yearfounded;
//         this.recommended = reccommended;
//     }
//     getBrand(){
//         return (`${this.recommended}, ${this.name} is a recommended brand, founded on ${this.yearfounded}`);
//     }
// }
// let ford = new Carbrand('FORD', 1847, true)
// class Toyota extends Carbrand {
//     constructor(name: string, yearfounded: number, recommended: boolean, protected brandtypes:string[]){
//         super(name, yearfounded, recommended)
//     }
// }
// let toyota = new Toyota('yoda', 1988, false, ['vits', 'allion', 'probox'])
// console.log(toyota)
// PRIVATE CONSTRUCTOR(SINGLETON DESIGN)
class Cars {
    constructor(name, model, inventor) {
        this.name = name;
        this.model = model;
        this.inventor = inventor;
    }
    static createInstance() {
        if (!Cars.instance) {
            this.instance = new Cars('audi', 2019, 'Gregory');
        }
        return this.instance;
    }
}
// //REST OPERATOR
// let sum:number = 0;
// function add(...numbers: number[]){
//     for(i=0; i<numbers.length; i++){
//         sum+=i
//     }
// }
// REST OPERATORS IN TYPESCRIPT
let sum = (...val) => {
    return val.reduce(function (a, b) {
        return a + b;
    });
};
// UNION TYPE
// function add(a:any, b:any){
//     if(typeof a ==='number' && typeof b ==='number'){
//         return a + b;
//     }
//     if(typeof a === 'string' && typeof b ==='string'){
//         return a.concat(b)
//     }
//     throw Error('Parameters must be of numbers or of string types')
// }
// INTERSECTION TYPE
// typeAB = typeA | typeB
// interface Male {
//     name: string
//     age: number
// }
// interface Female {
//     name: string
//     age: number
// }
// let p: person ={
//    name: 'James',
//    age: 45
// }
// type person = Male & Female;
