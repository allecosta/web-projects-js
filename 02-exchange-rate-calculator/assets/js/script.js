const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');
const rateResult = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;
  
  fetch("https://open.exchangerate-api.com/v6/latest")
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      const rate = data.rates[currency_two] / data.rates[currency_one];
      rateResult.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountTwo.value = (amountOne.value * (rate)).toFixed(2);
    });
}

currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
currencyTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});


calculate();