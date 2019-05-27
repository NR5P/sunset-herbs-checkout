const submitButton = document.getElementById("submitButton");
const reset = document.getElementById("reset");

///////////////////////ONCLICK LISTENERS////////////////////////////
submitButton.onclick = function() {
    calculateTotal();
};

reset.onclick = function() {

};

//////////////////////END ONCLICK LISTENERS/////////////////////////

///////////////////////VALIDATORS///////////////////////////////////
function phoneNumberValidation(phoneNumber) {
    let re = new RegExp("^\d{3}-\d{3}-\d{4}$");
    return re.test(phoneNumber) ? true : false;
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





















