let student = {
    id: 101,
    name: "Karthik",
    marks: 90
};

// Clone using spread operator
let clonedStudent = { ...student };

// Convert object to JSON string
let jsonString = JSON.stringify(clonedStudent);
console.log(jsonString);

// Display properties using for...in
for (let key in student) {
    console.log(key, student[key]);
}

// Error Handling
try {
    if (student.marks < 35) {
        throw new Error("Student Failed");
    } else {
        console.log("Student Passed");
    }
} catch (error) {
    console.log(error.message);
} finally {
    console.log("Execution Completed");
}