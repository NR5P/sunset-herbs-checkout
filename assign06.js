const submitButton = document.getElementById("submitButton");
const reset = document.getElementById("reset");

///////////////////////LISTENERS///////////////////////////////////
submitButton.onclick = function() {
    phoneNumberValidation();
};

reset.onclick = function() {
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementsByTagName("textarea").value = "";
    document.getElementById("phone").value = "";
    Array.from(document.getElementsByClassName("quantity-entry")).forEach(function(element) {
        element.value = "";
    })
    document.getElementById("exp-date").value = "";
    document.getElementsByName("credit_card").value = "";

    document.getElementById("first_name").focus();
};

// adds dash automatically as user types between month and year of exp date
document.getElementById("exp-date").oninput = function(e) {
    expDate = document.getElementById("exp-date");
    if (expDate.value.length == 2 && event.inputType != "deleteContentBackward") {
        expDate.value += "-";
    }
}

//////////////////////END LISTENERS///////////////////////////////////

///////////////////////VALIDATORS///////////////////////////////////
function phoneNumberValidation() {
    let phoneNumber = document.getElementById("phone");
    //let re = new RegExp("^\d{3}-\d{3}-\d{4}$");
    //let re = "/^\d{3}-\d{3}-\d{4}$/";
    if (/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber.value) == true) {
        phoneNumber.style.border = "3px solid green";

        const badEntryDiv = document.getElementById("phone-div");
        console.log(badEntryDiv.children);
        if (badEntryDiv.children[2].className == "bad-entry") {
            badEntryDiv.removeChild(badEntryDiv.children[2]);
        }
        return true;
    } else {
        const phoneDiv = document.getElementById("phone-div");
        phoneNumber.style.border = "3px solid red";
        let warningElement = document.createElement("small");
        warningElement.className += "bad-entry";
        let warningText = document.createTextNode(
                "phone number MUST be in the format 222-222-2222");
        warningElement.appendChild(warningText);
        phoneDiv.appendChild(warningElement);
        return false;
    }
    //return re.test(phoneNumber) ? true : false;
}

function creditCardValidation() {
    let cardNumber = document.getElementsByName("credit_card")[0].value;
    let re = new RegExp("\d{16}");
    return re.test(cardNumber ? true : false);
}

function expirationDateValidation() {
    let expDate = document.getElementById("exp-date");
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
        total += element.value * parseFloat(targetPrice[index].innerText.replace("$", ""));
    })

    return total.toFixed(2);
}





















