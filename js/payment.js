function addTotalPrice() {
    var totalPrice = localStorage.getItem("totalPrice");

    $("#totalPrice").html(`סה"כ לתשלום: ₪${totalPrice}`);
}

function paymentKindChecked() {
    var cardDetails = $("#cardDetails");

    if ($("#cardRadio").prop('checked')) {
        cardDetails.removeClass('visually-hidden')
    } else {
        cardDetails.addClass('visually-hidden')
    }
}

function deliveryKindChecked() {
    var deliveryDetails = $("#deliveryDetails");

    if ($("#delivery-radio").prop('checked')) {
        deliveryDetails.removeClass('visually-hidden')
    } else {
        deliveryDetails.addClass('visually-hidden')
    }
}

function submitForm(event) {
    event.preventDefault();

    if (validateForm()) {
        $('#success-order-modal').modal('show');
    } else {
        $('#error-toast').toast('show');
    }
}

function validateForm() {
    var isValid = true;

    isValid = (checkName(document.getElementById("first-name")))? isValid : false;
    isValid = (checkName(document.getElementById("last-name")))? isValid : false;
    isValid = (checkPhoneNumber(document.getElementById("phone")))? isValid : false;
    isValid = (checkDeliveryDetails())? isValid : false;
    isValid = (checkCreditCard())? isValid : false;

    return isValid;
}

function checkName(nameInput) {
    var name = nameInput.value;
    var lettersRegex = /^[A-Za-zא-ת]+$/;
    var isValid = (name.length >= 2 && name.match(lettersRegex));
    addValidationClass(nameInput, isValid);

    return isValid;
}

function checkPhoneNumber(phoneInput) {
    var phoneRegex = /^\d{10}$/;
    var isValid = phoneInput.value.match(phoneRegex);
    addValidationClass(phoneInput, isValid);

    return isValid;
}

function checkNumber(numberInput) {
    var numRegex = /^\d+$/;
    var isValid = numberInput.value.match(numRegex);
    addValidationClass(numberInput, isValid);

    return isValid;
}

function checkCreditNum(creditNumInput) {
    var creditRegex = /^\d{9,16}$/;
    var isValid = creditNumInput.value.match(creditRegex);
    addValidationClass(creditNumInput, isValid);

    return isValid;
}

function checkCVV(cvvInput) {
    var cvvRegex = /^\d{3}$/;
    var isValid = cvvInput.value.match(cvvRegex);
    addValidationClass(cvvInput, isValid);

    return isValid;
}

function checkId(idInput) {
    var idRegex = /^\d{9}$/;
    var isValid = idInput.value.match(idRegex);
    addValidationClass(idInput, isValid);

    return isValid;
}

function addValidationClass(inputElement, isValid) {
    if (isValid) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');

    } else {
        inputElement.classList.remove('is-valid');
        inputElement.classList.add('is-invalid');
    }
}

function checkCreditCard() {
    var isValid = true;

    if ($("#cardRadio").prop('checked')) {
        isValid = checkCreditNum(document.getElementById('card-number'))? isValid : false;
        isValid = checkCVV(document.getElementById("cvv"))? isValid : false;
        isValid = checkId(document.getElementById("id-number"))? isValid : false;
    }

    return isValid;
}

function checkDeliveryDetails() {
    var isValid = true;

    if ($("#delivery-radio").prop('checked')) {
        isValid = (checkName(document.getElementById("city")))? isValid : false;
        isValid = (checkName(document.getElementById("street")))? isValid : false;
        isValid = (checkNumber(document.getElementById("home-number")))? isValid : false;
    }

    return isValid;
}

function backToHomePage() {
    window.location.href  = "../html/home.html"
}

document.addEventListener('DOMContentLoaded', (event) => {
    addTotalPrice();

    $('#payment-form').on('submit', function(e) {
        submitForm(e)
    });
})
