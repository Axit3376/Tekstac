function BankAccount(initialBalance) {
    let balance = initialBalance;

    return {
        deposit: function(amount) {
            balance += amount;
        },

        withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
            } else {
                console.log("Insufficient Balance");
            }
        },

        getBalance: function() {
            return balance;
        }
    };
}

let account = BankAccount(1000);

account.deposit(500);
account.withdraw(200);

console.log(account.getBalance());