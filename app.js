





function Upper() {

    var amount = document.getElementById('amount').value;
    var rate = document.getElementById('rate').value;
    var months = document.getElementById('months').value;
    var total = (amount * (rate * .01)) / months;
    var payment = ((amount / months) + total).toFixed(2);
    payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('payment').innerHTML = "Aylıq ödəniş = "+payment +  ' ₼';
}