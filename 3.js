const products = [
    { name: "Laptop", price: 60000 },
    { name: "Mouse", price: 500 },
    { name: "Keyboard", price: 1500 },
    { name: "Monitor", price: 12000 }
];

// 1. Filter products above 1000
const filteredProducts = products.filter(product => product.price > 1000);

// 2. Get only product names
const productNames = filteredProducts.map(product => product.name);

// 3. Calculate total price
const totalPrice = filteredProducts.reduce((sum, product) => {
    return sum + product.price;
}, 0);

console.log(productNames);
console.log(totalPrice);