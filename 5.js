let email = "user@gmail.com";

// Validate email
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (emailRegex.test(email)) {
    console.log("Valid Email");
} else {
    console.log("Invalid Email");
}

// Extract domain
let domain = email.split("@")[1];
console.log("Domain:", domain);

// Display current date
let date = new Date();
console.log(date.toDateString());