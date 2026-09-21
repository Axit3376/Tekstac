function fetchStudent(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({
                    id: id,
                    name: "Rahul"
                });
            } else {
                reject("Invalid Student ID");
            }
        }, 2000);
    });
}

// Promise Chaining
fetchStudent(1)
    .then(student => {
        console.log(student);
        return student.name;
    })
    .then(name => {
        console.log(name);
    })
    .catch(error => {
        console.log(error);
    });


// Async/Await
async function getStudent() {
    try {
        let student = await fetchStudent(1);
        console.log(student);
        console.log(student.name);
    } catch (error) {
        console.log(error);
    }
}

getStudent();