const submitButton = document.getElementById("submitButton");
const reset = document.getElementById("reset");
const checkBoxes = document.querySelectorAll("input[type='checkbox']");
const totalOutput = document.getElementById("total-output");
const phoneInput = document.querySelector("#phone");
const firstName = document.getElementById("first_name"); 
const lastName = document.getElementById("last_name"); 
const textarea = document.getElementsByTagName("textarea"); 
const expDate = document.getElementById("exp-date"); 
const creditCardNumber = document.getElementsByName("credit_card"); 

const form = document.querySelector("#myForm");


let clickedOnce = false;

///////////////////////LISTENERS///////////////////////////////////
submitButton.onclick = function() {
    /* getting done with onsubmit now
    phoneNumberValidation();
    creditCardValidation();
    expirationDateValidation();

    clickedOnce = true;
    */
};

phoneInput.oninput = function() {
    if (clickedOnce == true)
        phoneNumberValidation();
};

reset.onreset = function() {
    firstName.value = "";
    lastName.value = "";
    textarea.value = "";
    phoneInput.value = "";
    Array.from(document.getElementsByClassName("quantity-entry")).forEach(function(element) {
        element.value = "";
    })
    expDate.value = "";
    creditCardNumber.value = "";

    firstName.focus();
};

// adds dash automatically as user types between month and year of exp date
expDate.oninput = function(e) {
    if (expDate.value.length == 2 && event.inputType != "deleteContentBackward") {
        expDate.value += "-";
    }
}

form.onsubmit = function() {
    phoneNumberValidation();
    creditCardValidation();
    expirationDateValidation();

    clickedOnce = true;

    return false;
}

//////////////////////END LISTENERS///////////////////////////////////

///////////////////////VALIDATORS///////////////////////////////////
function phoneNumberValidation() {
    let phoneNumber = document.getElementById("phone");
    //let re = new RegExp("^\d{3}-\d{3}-\d{4}$");
    //let re = "/^\d{3}-\d{3}-\d{4}$/";
    if (/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber.value) == true && phoneNumber.style.border != "3px solid green") {
        phoneNumber.style.border = "3px solid green";

        const badEntryDiv = document.getElementById("phone-div");
        console.log(badEntryDiv.children);
        if (badEntryDiv.children[2].className == "bad-entry") {
            badEntryDiv.removeChild(badEntryDiv.children[2]);
        }
        return true;
    } else if (phoneNumber.style.border != "3px solid red" && phoneNumber.style.border != "3px solid green") {
        console.log(phoneNumber.style.border);
        const phoneDiv = document.getElementById("phone-div");
        phoneNumber.style.border = "3px solid red";
        let warningElement = document.createElement("small");
        warningElement.className += "bad-entry";
        let warningText = document.createTextNode(
                "phone number MUST be in the format 222-222-2222");
        warningElement.appendChild(warningText);
        phoneDiv.appendChild(warningElement);
        phoneNumber.focus();
        return false;
    }
    //return re.test(phoneNumber) ? true : false;
}

function creditCardValidation() {
    creditCardNumber[0].value;
    let re = new RegExp("\d{16}");
    return re.test(creditCardNumber ? true : false);
}

function expirationDateValidation() {
    let expDateSplit = expDate.value.split("-");
    let expMonth = parseInt(expDateSplit[0]);
    let expYear = parseInt(expDateSplit[1]); //TODO fix this

    if (expMonth > 0 && expMonth < 13 && expYear > 2017)
        return true;
    return false;
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
        if (element.parentElement.previousElementSibling.children[0].checked) {
            total += element.value * parseFloat(targetPrice[index].innerText.replace("$", ""));
        }
    })
    totalOutput.value = total.toFixed(2);
    return total.toFixed(2);
}





















