// Function to calculate earnings with 0.1% buy and sell fees
function calculateEarnings(
  lowCryptoPrice,
  highCryptoPrice,
  amountOfMoneyToInvest
) {
  if (lowCryptoPrice <= 0 || highCryptoPrice <= 0) {
    return "Invalid price. Prices must be greater than zero.";
  }
  if (amountOfMoneyToInvest <= 0) {
    return "Invalid investment. The amount of money to invest must be greater than zero.";
  }

  // Define the transaction fee (0.1% = 0.001)
  const feeRate = 0.001;

  // Buy transaction details
  const buyFee = amountOfMoneyToInvest * feeRate;
  const effectiveInvestment = amountOfMoneyToInvest - buyFee;
  const amountOfCrypto = effectiveInvestment / lowCryptoPrice;

  // Sell transaction details
  const grossSellAmount = amountOfCrypto * highCryptoPrice;
  const sellFee = grossSellAmount * feeRate;
  const finalAmountOfMoney = grossSellAmount - sellFee;

  // Calculate the earnings (profit)
  const earnings = finalAmountOfMoney - amountOfMoneyToInvest;

  // Output the result as a table
  console.log("Transaction Details:");
  console.log("+---------------------+---------------+");
  console.log("|       Action        |    Amount     |");
  console.log("+---------------------+---------------+");
  console.log(
    `| Buy Total           | $${amountOfMoneyToInvest
      .toFixed(2)
      .padStart(11)}  |`
  );
  console.log(`| Buy Fee (0.1%)      | $${buyFee.toFixed(2).padStart(11)}  |`);
  console.log(
    `| Buy Total (no fee)  | $${effectiveInvestment.toFixed(2).padStart(11)}  |`
  );
  console.log("+---------------------+---------------+");
  console.log(
    `| Sell Total (before) | $${grossSellAmount.toFixed(2).padStart(11)}  |`
  );
  console.log(`| Sell Fee (0.1%)     | $${sellFee.toFixed(2).padStart(11)}  |`);
  console.log(
    `| Sell Total (after)  | $${finalAmountOfMoney.toFixed(2).padStart(11)}  |`
  );
  console.log("+---------------------+---------------+");
  console.log(
    `| Profit              | $${earnings.toFixed(2).padStart(11)}  |`
  );
  console.log("+---------------------+---------------+");

  return earnings;
}

// Get arguments from the terminal
const args = process.argv.slice(2); // Skips the first two elements (node and filename)

// Ensure we have exactly 3 arguments (low price, high price, amount to invest)
if (args.length !== 3) {
  console.log(
    "Usage: node script.js <lowCryptoPrice> <highCryptoPrice> <amountOfMoneyToInvest>"
  );
  process.exit(1); // Exit the program with an error code
}

// Parse arguments
const lowCryptoPrice = parseFloat(args[0]);
const highCryptoPrice = parseFloat(args[1]);
const amountOfMoneyToInvest = parseFloat(args[2]);

// Ensure the arguments are valid numbers
if (
  isNaN(lowCryptoPrice) ||
  isNaN(highCryptoPrice) ||
  isNaN(amountOfMoneyToInvest)
) {
  console.log(
    "Please provide valid numbers for low price, high price, and amount to invest."
  );
  process.exit(1);
}

// Calculate earnings
const profit = calculateEarnings(
  lowCryptoPrice,
  highCryptoPrice,
  amountOfMoneyToInvest
);

// Output the profit result
console.log(`\nYou earned $${profit.toFixed(2)} from your investment.`);
