// Function to calculate earnings with 0.1% sell and buy fees in reverse order (selling first, then buying back)
function calculateReverseEarnings(sellPrice, buyPrice, coinAmount) {
  if (sellPrice <= 0 || buyPrice <= 0) {
    return "Invalid price. Prices must be greater than zero.";
  }
  if (coinAmount <= 0) {
    return "Invalid amount. Coin amount must be greater than zero.";
  }

  // Define the transaction fee (0.1% = 0.001)
  const feeRate = 0.001;

  // Sell transaction details
  const grossSellAmount = coinAmount * sellPrice; // Total before fees
  const sellFee = grossSellAmount * feeRate; // Fee calculated from the sell amount in dollars
  const effectiveSellAmount = grossSellAmount - sellFee; // Total after sell fee

  // Buy transaction details
  const buyFee = effectiveSellAmount * feeRate; // Fee calculated from the buy amount in dollars
  const effectiveBuyAmount = effectiveSellAmount - buyFee; // Total after buy fee
  const amountOfCryptoBoughtBack = effectiveBuyAmount / buyPrice; // Amount of crypto bought back

  // Calculate profit (final amount of USD after buying back minus initial investment)
  const initialInvestment = coinAmount * buyPrice; // The initial investment amount in USD
  const finalEarnings = amountOfCryptoBoughtBack * buyPrice - initialInvestment; // Final earnings after selling and buying back

  // Output the result as a table
  console.log("Transaction Details:");
  console.log("+------------------------------+---------------+");
  console.log("|            Action            |    Amount     |");
  console.log("+------------------------------+---------------+");
  console.log(
    `| Sell Total (before fee)       | $${grossSellAmount
      .toFixed(2)
      .padStart(11)} |`
  );
  console.log(
    `| Sell Fee (0.1%)               | $${sellFee.toFixed(2).padStart(11)} |`
  );
  console.log(
    `| Sell Total (after fee)        | $${effectiveSellAmount
      .toFixed(2)
      .padStart(11)} |`
  );
  console.log("+------------------------------+---------------+");
  console.log(
    `| Buy Total (available)         | $${effectiveSellAmount
      .toFixed(2)
      .padStart(11)} |`
  );
  console.log(
    `| Buy Fee (0.1%)                | $${buyFee.toFixed(2).padStart(11)} |`
  );
  console.log(
    `| Buy Total (after fee)         | $${effectiveBuyAmount
      .toFixed(2)
      .padStart(11)} |`
  );
  console.log(
    `| Crypto Bought Back            | ${amountOfCryptoBoughtBack
      .toFixed(6)
      .padStart(11)} |`
  );
  console.log("+------------------------------+---------------+");
  console.log(
    `| Profit in USD                 | $${finalEarnings
      .toFixed(2)
      .padStart(11)} |`
  );
  console.log("+------------------------------+---------------+");

  return finalEarnings;
}

// Get arguments from the terminal
const args = process.argv.slice(2); // Skips the first two elements (node and filename)

// Ensure we have exactly 3 arguments (sell price, buy price, coin amount)
if (args.length !== 3) {
  console.log("Usage: node main.js <sellPrice> <buyPrice> <coinAmount>");
  process.exit(1); // Exit the program with an error code
}

// Parse arguments
const sellPrice = parseFloat(args[0]);
const buyPrice = parseFloat(args[1]);
const coinAmount = parseFloat(args[2]);

// Ensure the arguments are valid numbers
if (isNaN(sellPrice) || isNaN(buyPrice) || isNaN(coinAmount)) {
  console.log(
    "Please provide valid numbers for sell price, buy price, and coin amount."
  );
  process.exit(1);
}

// Calculate reverse earnings
const profit = calculateReverseEarnings(sellPrice, buyPrice, coinAmount);

// Output the profit result
console.log(`\nYou earned $${profit.toFixed(2)} from your reverse trade.`);
