class FourthYearStudent {
    constructor(name, age, units){
        this.name = name;
        this.age = age;
        this.units= units;
    }
    static getYearOfStudy(){
        return 4;
    }
     getStudentAge(){
        return this.age
    }
}

let fred = new FourthYearStudent('Fred', 18, ['Maths', 'English', 'Science'])
console.log(fred)
