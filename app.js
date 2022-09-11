





function Upper() {

    var amount = document.getElementById('amount').value;
    var rate = document.getElementById('rate').value;
    var months = document.getElementById('months').value;
    var total = (amount * (rate * .01)) / months;
    var payment = ((amount / months) + total).toFixed(2);
    payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('payment').innerHTML = "Aylıq ödəniş = "+payment +  ' ₼';
    var payment = document.querySelector("[data-result-value]");
}




/**
 * Copy of Excel's PMT function.
 * Credit: http://stackoverflow.com/questions/2094967/excel-pmt-function-in-js
 *
 * @param rate_per_period       The interest rate for the loan.
 * @param number_of_payments    The total number of payments for the loan in months.
 * @param present_value         The present value, or the total amount that a series of future payments is worth now;
 *                              Also known as the principal.
 * @param future_value          The future value, or a cash balance you want to attain after the last payment is made.
 *                              If fv is omitted, it is assumed to be 0 (zero), that is, the future value of a loan is 0.
 * @param type                  Optional, defaults to 0. The number 0 (zero) or 1 and indicates when payments are due.
 *                              0 = At the end of period
 *                              1 = At the beginning of the period
 * @returns {number}
 */
 function pmt(rate_per_period, number_of_payments, present_value, future_value, type){
    future_value = typeof future_value !== 'undefined' ? future_value : 0;
    type = typeof type !== 'undefined' ? type : 0;

	if(rate_per_period != 0.0){
		// Interest rate exists
		var q = Math.pow(1 + rate_per_period, number_of_payments);
		return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

	} else if(number_of_payments != 0.0){
		// No interest rate, but number of payments exists
		return -(future_value + present_value) / number_of_payments;
	}

	return 0;
}

var numberFormatter = new Intl.NumberFormat("ru", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

function wordForm(num, word) {
  cases = [2, 0, 1, 1, 1, 2];
  return word[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  ];
}

// Слайдер денег
var moneyRangeSliderElem = document.querySelector("[data-money-range-slider]");
var moneyRangevalueElem = document.querySelector("[data-money-range-value]");

var monthsRangeSliderElem = document.querySelector(
  "[data-months-range-slider]"
);
var monthsRangeValueElem = document.querySelector("[data-months-range-value]");
var monthsRangeMeasureElem = document.querySelector(
  "[data-months-range-measure]"
);

var resultValueElem = document.querySelector("[data-result-value]");

noUiSlider.create(moneyRangeSliderElem, {
  start: [200000],
  step: 5000,
  connect: [true, false],
  format: wNumb({
    decimals: 0
  }),
  range: {
    min: 100000,
    max: 1500000
  }
});

// Слайдер месяцев

noUiSlider.create(monthsRangeSliderElem, {
  start: [3],
  step: 1,
  connect: [true, false],
  format: wNumb({
    decimals: 0
  }),
  range: {
    min: 1,
    max: 18
  }
});

function calcPayment() {
  var moneyValue = parseInt(moneyRangeSliderElem.noUiSlider.get(), 10);
  var monthsValue = parseInt(monthsRangeSliderElem.noUiSlider.get(), 10);
  
  console.log(-pmt(0.24/12, monthsValue, moneyValue))

  resultValueElem.textContent = numberFormatter.format(
    moneyValue * monthsValue * 0.1
  );
}

moneyRangeSliderElem.noUiSlider.on("update", function(values, handle) {
  moneyRangevalueElem.textContent = numberFormatter.format(values[handle]);

  calcPayment();
});

monthsRangeSliderElem.noUiSlider.on("update", function(values, handle) {
  monthsRangeValueElem.textContent = values[handle];
  monthsRangeMeasureElem.textContent = wordForm(values[handle], [
    "месяц",
    "месяца",
    "месяцев"
  ]);

  calcPayment();
});
