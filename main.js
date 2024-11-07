if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    });
  });
}

function calculateEarnings() {
  const lowCryptoPrice = parseFloat(
    document.getElementById("lowCryptoPrice").value
  );
  const highCryptoPrice = parseFloat(
    document.getElementById("highCryptoPrice").value
  );
  const amountToInvest = parseFloat(
    document.getElementById("amountToInvest").value
  );
  const feeRate = 0.001;

  if (lowCryptoPrice > 0 && highCryptoPrice > 0 && amountToInvest > 0) {
    const buyFee = amountToInvest * feeRate;
    const effectiveInvestment = amountToInvest - buyFee;
    const amountOfCrypto = effectiveInvestment / lowCryptoPrice;

    const grossSellAmount = amountOfCrypto * highCryptoPrice;
    const sellFee = grossSellAmount * feeRate;
    const finalAmountOfMoney = grossSellAmount - sellFee;

    const earnings = finalAmountOfMoney - amountToInvest;

    document.getElementById("buySellDetails").innerHTML = `
        <tr><td>Buy Total</td><td>$${amountToInvest.toFixed(2)}</td></tr>
        <tr><td>Buy Fee (0.1%)</td><td>$${buyFee.toFixed(2)}</td></tr>
        <tr class="section-divider"><td>Buy Total (after fee)</td><td>$${effectiveInvestment.toFixed(
          2
        )}</td></tr>
        <tr><td>Sell Total (before fee)</td><td>$${grossSellAmount.toFixed(
          2
        )}</td></tr>
        <tr><td>Sell Fee (0.1%)</td><td>$${sellFee.toFixed(2)}</td></tr>
        <tr class="section-divider"><td>Sell Total (after fee)</td><td>$${finalAmountOfMoney.toFixed(
          2
        )}</td></tr>
        <tr class="profit"><td>Profit</td><td>$${earnings.toFixed(2)}</td></tr>
      `;
  } else {
    document.getElementById("buySellDetails").innerHTML =
      "<tr><td colspan='2'>Please enter valid values.</td></tr>";
  }
}

function calculateReverseEarnings() {
  const sellPrice = parseFloat(document.getElementById("sellPrice").value);
  const buyPrice = parseFloat(document.getElementById("buyPrice").value);
  const coinAmount = parseFloat(document.getElementById("coinAmount").value);
  const feeRate = 0.001;

  if (sellPrice > 0 && buyPrice > 0 && coinAmount > 0) {
    const grossSellAmount = coinAmount * sellPrice;
    const sellFee = grossSellAmount * feeRate;
    const effectiveSellAmount = grossSellAmount - sellFee;

    const buyFee = effectiveSellAmount * feeRate;
    const effectiveBuyAmount = effectiveSellAmount - buyFee;
    const amountOfCryptoBoughtBack = effectiveBuyAmount / buyPrice;

    const initialInvestment = coinAmount * buyPrice;
    const finalEarnings =
      amountOfCryptoBoughtBack * buyPrice - initialInvestment;

    document.getElementById("sellBuyDetails").innerHTML = `
        <tr><td>Sell Total (before fee)</td><td>$${grossSellAmount.toFixed(
          2
        )}</td></tr>
        <tr><td>Sell Fee (0.1%)</td><td>$${sellFee.toFixed(2)}</td></tr>
        <tr class="section-divider"><td>Sell Total (after fee)</td><td>$${effectiveSellAmount.toFixed(
          2
        )}</td></tr>
        <tr><td>Buy Total (available)</td><td>$${effectiveSellAmount.toFixed(
          2
        )}</td></tr>
        <tr><td>Buy Fee (0.1%)</td><td>$${buyFee.toFixed(2)}</td></tr>
        <tr class="section-divider"><td>Buy Total (after fee)</td><td>$${effectiveBuyAmount.toFixed(
          2
        )}</td></tr>
        <tr class="profit"><td>Profit</td><td>$${finalEarnings.toFixed(
          2
        )}</td></tr>
      `;
  } else {
    document.getElementById("sellBuyDetails").innerHTML =
      "<tr><td colspan='2'>Please enter valid values.</td></tr>";
  }
}
