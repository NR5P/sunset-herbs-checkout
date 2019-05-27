const submitButton = document.getElementById("submitButton");
const reset = document.getElementById("reset");

///////////////////////LISTENERS///////////////////////////////////
submitButton.onclick = function() {
    calculateTotal();
};

reset.onclick = function() {

};

document.getElementById("exp-date").oninput = function(e) {
    expDate = document.getElementById("exp-date");
    if (expDate.value.length == 2 && event.inputType != "deleteContentBackward") {
        expDate.value += "-";
    }
}

//////////////////////END ONCLICK LISTENERS/////////////////////////

///////////////////////VALIDATORS///////////////////////////////////
function phoneNumberValidation() {
    let phoneNumber = document.getElementById("phone").value;
    let re = new RegExp("^\d{3}-\d{3}-\d{4}$");
    return re.test(phoneNumber) ? true : false;
}

function creditCardValidation() {
    let cardNumber = document.getElementsByName("credit_card")[0].value;
    let re = new RegExp("\d{16}");
    return re.test(cardNumber ? true : false);
}

///////////////////////END VALIDATORS///////////////////////////////

/*****************************************************************
 * totals the amount of items selected and returns the total
*******************************************************************/
function calculateTotal() {
    let total = 0;

    // returns an array like object to get the quantities entered by each item in table
    let targetQuantityEntry = document.getElementsByClassName("quantity-entry");

    // target the prices of each item in the table returns array like object
    let targetPrice = document.getElementsByClassName("price-per-ounce");

    Array.from(targetQuantityEntry).forEach(function (element, index) {
        total += element.value * parseFloat(targetPrice[index].innerText.replace("$", ""));
    })

    return total.toFixed(2);
}





















