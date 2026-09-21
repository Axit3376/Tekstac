const AttendanceMixin = {
    markAttendance: function() {
        console.log("Attendance Marked");
    }
};

class Person {
    constructor(name) {
        this.name = name;
    }

    display() {
        console.log(this.name);
    }

    static college() {
        return "XYZ Engineering College";
    }
}

class Student extends Person {
    constructor(name, rollNumber) {
        super(name);
        this.rollNumber = rollNumber;
    }
}

// Add mixin functionality to Student
Object.assign(Student.prototype, AttendanceMixin);

// Create student
let student = new Student("Karthik", 101);

// Operations
student.display();
student.markAttendance();
console.log(Person.college());