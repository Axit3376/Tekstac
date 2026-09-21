const calculateSalary = (employeeName, basicSalary, allowancePercentage = 10, taxPercentage = 5) => {
    let grossSalary = basicSalary + (basicSalary * allowancePercentage / 100);
    let netSalary = grossSalary - (grossSalary * taxPercentage / 100);

    return {
        employeeName: employeeName,
        grossSalary: grossSalary,
        netSalary: netSalary
    };
};

const result = calculateSalary("Sachin", 50000);
console.log(result);
