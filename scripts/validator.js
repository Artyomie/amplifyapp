/* 
 * 
 *  Validation for 5_Registration page
 *  Data to be sent via php to server database
 */

//Form validation script - AL
var strErrorMsg;
function validate() {
    strErrorMsg = ""; //Error msg is added on to with line breaks each error to display the full error list in one string - AL
    var validationmsg = document.getElementById('verifymsg');

    // First name error validation (checks if its not empty, then checks if its a letter - AL
    if(notEmpty(document.getElementById('firstname'), "Enter one or more characters for First Name.")) {
        isAlphabet(document.getElementById('firstname'), "Enter only letter characters for First Name.");
    }

    // Last name error validation - AL
    if(notEmpty(document.getElementById('lastname'), "Enter one or more characters for Last Name.")) {
        isAlphabet(document.getElementById('lastname'), "Enter only letter characters for Last Name.");
    }

    // Gender radio button selected validation (checks if type input with name as gender is checked) - AL
    isChecked(document.querySelector('input[name = "gender"]:checked'), "Check a gender.");

    // Street number validation - AL
    if(notEmpty(document.getElementById('streetnum'), "Enter one or more numbers for Street Number")) {
        isNumber(document.getElementById('streetnum'), "Enter only number digits for Street Number");
    }

    // Street name validation (one or more letters, numbers, spaces, hyphens, commas, or periods) - AL
    if(notEmpty(document.getElementById('streetname'), "Enter one or more characters for Street Name.")) {
        isCharacter(document.getElementById('streetname'), "Enter valid letters, numbers, spaces, hyphens, commas, or periods for Street Name.");
    }

    // City name validation - AL
    if(notEmpty(document.getElementById('city'), "Enter one or more characters for City.")) {
        isAlphabet(document.getElementById('city'), "Enter only letter characters for City.");
    }

    // State selection validation - AL
    isSelected(document.getElementById('state'), "Select a state");

    // Zip code validation - AL
    if(notEmpty(document.getElementById('zip'), "Zip code not entered")) {
        if(isNumber(document.getElementById('zip'), "Enter only number digits for Zip code")) {
            checklength(document.getElementById('zip'), "Enter 5 digits for Zip code", 5);
        }
    }

    // Phone number validation - AL
    phoneValidation(document.getElementById('phone1'), document.getElementById('phone2'), document.getElementById('phone3'));

    // Suggestion box validation - AL
    notEmpty(document.getElementById('suggestion'), "Enter a suggestion.");

    // Check if error message has anything added on, if not then submit form succesfully
    if(strErrorMsg !== "") {
        validationmsg.style.color="#ff3333";
        validationmsg.innerHTML='<p>Check form for errors.<p>';
        alert("Errors encountered:\n" + strErrorMsg);
        return false;
    } else {
        validationmsg.style.color="#000000";
        validationmsg.innerHTML='<p>Form submitted succesfully.<p>';
        return true;
    }
}

function notEmpty(element, helperMsg) {
    if(element.value === "") {
        strErrorMsg += helperMsg + "\n";
        element.style.backgroundColor="#f4a8a8";
        return false;
    } else {
        element.style.backgroundColor="#ffffff";
        return true;
    }
}

function isAlphabet(element, helperMsg) {
    var isLetter = /^[a-zA-Z ]+$/;
    if(!(element.value.match(isLetter)) && element.value !== "") {
        strErrorMsg += helperMsg + "\n";
        element.style.backgroundColor="#f4a8a8";
    } else {
        element.style.backgroundColor="#ffffff";
    }
}

function isChecked(element, helperMsg) {
    if(element === null) {
        strErrorMsg += helperMsg + "\n";
    }
}

function isNumber(element, helperMsg) {
    var isNum = /^[0-9]+$/;
    if(!element.value.match(isNum) && element.value !== "") {
        strErrorMsg += helperMsg + "\n";
        element.style.backgroundColor="#f4a8a8";
        return false;
    } else {
        element.style.backgroundColor="#ffffff";
        return true;
    }
}

function isCharacter(element, helperMsg) {
    var isChar = /^[a-zA-Z0-9 ,.-]+$/;
    if(!element.value.match(isChar) && element.value !== "") {
        strErrorMsg += helperMsg + "\n";
        element.style.backgroundColor="#f4a8a8";
        return false;
    } else {
        element.style.backgroundColor="#ffffff";
        return true;
    }
}

function isSelected(element, helperMsg) {
    if(element.selectedIndex === 0) {
        strErrorMsg += helperMsg + "\n";
        element.style.backgroundColor="#f4a8a8";
    } else {
        element.style.backgroundColor="#ffffff";
    }
}

function checklength(element, helperMsg, maxlength) {
    if(element.value.length !== maxlength) {
        strErrorMsg += helperMsg + "\n";
        element.style.backgroundColor="#f4a8a8";
    } else {
        element.style.backgroundColor="#ffffff";
    }
}

function phoneValidation(phone1, phone2, phone3) {
    var isNum = /^[0-9]+$/;
    var error = "";

    if(phone1.value !== "") {
        if(phone1.value.match(isNum)) {
            if(phone1.value.length === 3) {
                phone1.style.backgroundColor="#ffffff";
            } else {
                phone1.style.backgroundColor="#f4a8a8";
                error += "Enter 3 digits in first phone number box\n";
            }
        } else {
            phone1.style.backgroundColor="#f4a8a8";
            error += "Enter valid number digits in first phone number box\n";
        }
    } else {
        phone1.style.backgroundColor="#f4a8a8";
        error += "Phone number box 1 is empty\n";
    }

    if(phone2.value !== "") {
        if(phone2.value.match(isNum)) {
            if(phone2.value.length === 3) {
                phone2.style.backgroundColor="#ffffff";
            } else {
                phone2.style.backgroundColor="#f4a8a8";
                error += "Enter 3 digits in second phone number box\n";
            }
        } else {
            phone2.style.backgroundColor="#f4a8a8";
            error += "Enter valid number digits in second phone number box\n";
        }
    } else {
        phone2.style.backgroundColor="#f4a8a8";
        error += "Phone number box 2 is empty\n";
    }

    if(phone3.value !== "") {
        if(phone3.value.match(isNum)) {
            if(phone3.value.length === 4) {
                phone3.style.backgroundColor="#ffffff";
            } else {
                phone3.style.backgroundColor="#f4a8a8";
                error += "Enter 4 digits in third phone number box\n";
            }
        } else {
            phone3.style.backgroundColor="#f4a8a8";
            error += "Enter valid number digits in third phone number box\n";
        }
    } else {
        phone3.style.backgroundColor="#f4a8a8";
        error += "Phone number box 3 is empty\n";
    }

    if(error !== "") {
        strErrorMsg += error;
    }
}