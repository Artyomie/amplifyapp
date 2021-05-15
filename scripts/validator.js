/* 
 * - CSC-125 FINAL PROJECT 
 * - Name: Artem Latypov
 * - Date: 5/14/2021
 * - Section: CSC-125
 * - Title: Final Project
 * 
 *  Created on : May 7th, 2021, 7:08:42 PM
 *  Author     : Artem Latypov  
 *  Validation for 5_Registration page
 *  Data to be sent via php to server database
 *  
 */

window.addEventListener("load", function () {
    // form object - AL
    var form = document.getElementById("registration");
    var validationmsg = document.getElementById('verifymsg');

    //Use JS AJAX to create an http request thru php to write data on server I/O file and send data to SQL database - AL
    function AJAXsendData() {
        var xmlhttp = new XMLHttpRequest();
        //create formdata object to be sent to server - AL
        const formdata = new FormData(form);
        var registerfile = "../server/registrationdata.php";

        xmlhttp.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
              //Print echo response text inside html - AL
              validationmsg.innerHTML = '<p>' + this.responseText + '</p>';
              
              //Once the php script callback confirms that data was written on database, send user to checkout page - Al
              if (this.responseText === "Registration complete") {
                  sessionStorage.registered = 1; // Set to 1 or true - AL
                  location.href = "6_checkout.html";
              } else if(this.reponseText === null) {
                  alert("There was an error sending your request. No server response(PHP not connected).");
              }
          }
        };
        
        // When submit goes through - AL
        xmlhttp.addEventListener("load", function(event) {
            //alert("Registration succesful");
        });

        // Error sending request message  - AL
        xmlhttp.addEventListener("error", function(event) {
            alert("There was an error sending your request, please try again");
        });

        //Send data to php file with POST - AL
        xmlhttp.open("POST", registerfile, true);
        xmlhttp.setRequestHeader("Registration-data", "registration/form");
        xmlhttp.send(formdata);
        
    }
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        // Check if error message has anything added on, if not then submit form succesfully
        if(strErrorMsg !== "") {
            validationmsg.style.color="#ff3333";
            validationmsg.innerHTML='<p>Check form for errors.<p>';
            alert("Errors encountered:\n" + strErrorMsg);
        } else {
            // When errors are fixed, call ajax php function to submit data to server
            validationmsg.style.color="#000000";
            validationmsg.innerHTML='<p>Registration submitted succesfully.<p>';
            AJAXsendData();
        }
    } );
} );


//Form validation script - AL
var strErrorMsg;
function validate() {
    strErrorMsg = ""; //Error msg is added on to with line breaks each error to display the full error list in one string - AL

    // First name error validation (checks if its not empty, then checks if its a letter - AL
    if(notEmpty(document.getElementById('firstname'), "Enter one or more characters for First Name.")) {
        isAlphabet(document.getElementById('firstname'), "Enter only letter characters for First Name.");
    } else {
        fname = document.getElementById('firstname').value;
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

    // Email validation - AL
    var email = document.getElementById('email');
    if(notEmpty(email, "Enter your email")) {
        emailValidation(email, "Please enter a valid email");
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

function emailValidation(email, helperMsg) {
    var pattern = /[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/;
    
    if(!email.value.match(pattern) && email.value !== "") {
        strErrorMsg += helperMsg + "\n";
        email.style.backgroundColor="#f4a8a8";
        return false;
    } else {
        email.style.backgroundColor="#ffffff";
        return true;
    }
    
}