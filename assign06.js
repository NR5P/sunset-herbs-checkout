const submitButton = document.getElementById("submitButton");
const reset = document.getElementById("reset");
const checkBoxes = document.querySelectorAll("input[type='checkbox']");
const totalOutput = document.querySelector(".total-output");
const phoneInput = document.querySelector("#phone");
const firstName = document.getElementById("first_name"); 
const lastName = document.getElementById("last_name"); 
const textarea = document.getElementsByTagName("textarea"); 
const expDate = document.getElementById("exp-date"); 
const creditCardNumber = document.getElementsByName("credit_card")[0]; 

const form = document.querySelector("#myForm");


let clickedOnce = false;

///////////////////animation////////////////////////////////
window.onload = function() {
    animateBanner();
}

function animateBanner() {
    let r = 164;
    let g = 102;
    let b = 55;

    const banner = document.querySelector("#banner-area");
    let interval = setInterval(changeSunrise, 25);
    //banner.style.backgroundImage = "linear-gradient(rgb(237, 229, 37), rgb(164, 102, 55))";

    function changeSunrise() {
        if (r == 237 && g == 229 && b == 37) {
            clearInterval(interval);
        } else {
            if (r != 237)
                r++;
            if (g != 229)
                g++;
            if (b != 37)
                b--;
        }
        banner.style.backgroundImage = `linear-gradient(rgb(${r}, ${g}, ${b}), rgb(164, 102, 55))`;
    }
}

//////////////////////end animation///////////////////////

///////////////////////LISTENERS///////////////////////////////////
submitButton.onclick = function() {
    /* getting done with onsubmit instead now
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

reset.onclick = function() {
    firstName.focus();
}

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
        if (badEntryDiv.children[2].className == "bad-entry") {
            badEntryDiv.removeChild(badEntryDiv.children[2]);
        }
        return true;
    } else if (phoneNumber.style.border != "3px solid red" && phoneNumber.style.border != "3px solid green") {
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
    creditCardNumber.value;
    if (/^\d{16}$/.test(creditCardNumber.value) == true && creditCardNumber.style.border != "3px solid green") {
        let cardDiv = document.getElementById("credit-card-div"); 
        if (creditCardNumber.style.border == "3px solid red");
            cardDiv.removeChild(cardDiv.children[2]);
        creditCardNumber.style.border = "3px solid green";
        //let cardDiv = document.getElementById("credit-card-div");
        if (cardDiv.children[1].className == "bad-entry") {
            cardDiv.removeChild(cardDiv.children[2]);
        }
    } else if (creditCardNumber.style.border != "3px solid red") {
        let cardDiv = document.getElementById("credit-card-div"); 
        creditCardNumber.style.border = "3px solid red";
        let warningElement = document.createElement("small");
        warningElement.className += "bad-entry";
        let warningText = document.createTextNode(
                "card number must be 16 digits in length");
        warningElement.appendChild(warningText);
        cardDiv.appendChild(warningElement);
        creditCardNumber.focus();
        //console.log(cardDiv.children[2]);
        return false;
    }

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





















