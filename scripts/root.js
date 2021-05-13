/* 
 * 
 * Created on : Apr 19, 2021, 1:02:19 PM
 * Author     : artemlatypov
 * Javascript page for index site functions
 * 
 */

// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction();};

// Top of document (logo) and toolbar is set absolute, and replaced by fixed toolbar after scroll down
// Side navigation also scrolls down, and then set to be fixed after scrolling more than 80px
function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("iheader").style.position = "fixed";
        document.getElementById("iheader").style.top = "0px";
        document.getElementById("inav").style.position = "fixed";
        document.getElementById("inav").style.top = "48px";
        document.getElementById("sidenav").style.position = "fixed";
        document.getElementById("sidenav").style.top = "48px";
        document.getElementById("cartsummary").style.position = "fixed";
        document.getElementById("cartsummary").style.top = "48px";
    } else {
        document.getElementById("iheader").style.position = "absolute";
        document.getElementById("iheader").style.top = "100px";
        document.getElementById("inav").style.position = "absolute";
        document.getElementById("inav").style.top = "148px";
        document.getElementById("sidenav").style.position = "absolute";
        document.getElementById("sidenav").style.top = "148px";
        document.getElementById("cartsummary").style.position = "absolute";
        document.getElementById("cartsummary").style.top = "148px";
    }
}

// Side navigation open and close button

function openNav() {
        document.getElementById("sidenav").style.width = "200px";
        document.getElementById("hcontent").style.marginLeft = "200px";
}

function closeNav() {
        document.getElementById("sidenav").style.width = "0";
        document.getElementById("hcontent").style.margin = "auto";
}
    

/******* CART SCRIPT ********/

// Cart open and close button
function openCart() {
    if(document.getElementById("cartsummary").style.width === "300px") {
        document.getElementById("cartsummary").style.width = "0px";
        for(var i = 0; i < document.getElementsByClassName("removebutton").length; i++) {
            document.getElementsByClassName("removebutton")[i].style.display = "none";
        }
    } else {
        document.getElementById("cartsummary").style.width = "300px";
        showButtons();
    }
}

// For some reason the remove cart buttons stay when closed
function showButtons() {
    if(document.getElementById("cartsummary").style.width === "300px") {
        for(var i = 0; i < document.getElementsByClassName("removebutton").length; i++) {
                document.getElementsByClassName("removebutton")[i].style.display = "inline";
        }
    }
}

// Initialize JSsession storage variables
if(!sessionStorage.cartNum) {
    sessionStorage.cartNum = 0;
}
if(!sessionStorage.maxindex) {
    sessionStorage.maxindex = 0;
}
if(!sessionStorage.registered) {
    sessionStorage.registered = 0;
}

// Check if DOM element are loaded before executing page loading code
window.addEventListener('DOMContentLoaded', () => {
    ready();
});

// Check if DOM content has changed to be updated
document.addEventListener('readystatechange', function() {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", update);
    } else {
        update();
    }
});

// Check what page is loaded
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
console.log(sPage);

// Code to be executed when new page opens
function ready() {
    
    //getWidth();
    updateCart();
    loadCart();
    
    // Get array for add to cart buttons from store
    var addToCartButtons = document.getElementsByClassName("buybutton");
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCart);
    }
}

// Code to be executed when page change
function update() {
    
    updateCart();
    showButtons();
    
    // Get array for remove from cart buttons from cart
    var removeFromCartButtons = document.getElementsByClassName("removebutton");
    for (var i = 0; i < removeFromCartButtons.length; i++) {
        var button = removeFromCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    
    var quantityInput = document.getElementsByClassName("cartquantity");
    for (var i = 0; i < quantityInput.length; i++) {
        var button = quantityInput[i];
        if(quantityInput[i].value !== "undefined") {
            button.addEventListener('input', updateQuantity);
        } 
    }
    
}


// Update the cart on change
function updateCart() {
    document.getElementById("cart").innerHTML = "Cart (" + sessionStorage.cartNum + ")";
    updateCartTotal();
    /*console.log(sessionStorage.maxindex);*/
    
}

// Load cart when page is re-loaded or page changed. Session storage is recalled with a pseudo index concatedenated onto each
// storage item. Inner HTML contents are added with all the values for theelements for each indexed item. 
function loadCart() {
    var cartItems = document.getElementsByClassName("items")[0];
    if(cartItems.children.length <= 4 && sessionStorage.maxindex > 0) {
        console.log(sessionStorage.maxindex);
        for(var i = 0; i < sessionStorage.maxindex; i++) {
            var name = sessionStorage.getItem("item" + i);
            var price = sessionStorage.getItem("price" + i);
            var quantity = sessionStorage.getItem("quantity" + i);
            var img = sessionStorage.getItem("imgsrc" + i);
            var index = i;
            
            var cartRow = document.createElement("div");
            cartRow.classList.add("cartrow"); // Add css class to new div
            var cartItems = document.getElementsByClassName("items")[0];
            var addCartRowContents = `
                <img class="cartitemimg" src="${img}">
                <div class="cartitemtitle">${name}</div>
                <br>
                <div class="cartitemprice">${price}</div>
                <div class="cartitemquantity">
                    <input class="cartquantity" type="number" value="${quantity}">
                </div>
                <div class="cartitemremove">
                    <input class="removebutton" type="button" value="Remove">
                </div>
                <div class="hiddenindex">${index}</div>
                <br>
            `;

            cartRow.innerHTML = addCartRowContents;
            cartItems.append(cartRow);
        }
    }
}

function addToCart(event) {
    
    // Show popup fade in animation for add to cart on bottom
    var fadein = document.getElementById("addcartfadein");
    fadein.style.visibility = "visible";
    fadein.classList.add("show");
    setTimeout(function(){ 
        fadein.classList.remove("show");
        fadein.style.visibility = "hidden";
    }, 3000);
    
    
    var button = event.target;
    var item = button.parentElement;
    var name = item.getElementsByClassName("itemtitle")[0].innerText;
    var price = item.getElementsByClassName("itemprice")[0].innerText;
    var img = item.parentElement.getElementsByClassName("itemimg")[0].src;
    var quantity = 1;
    
    addCartElement(name, price, quantity, img);
    
    /*
    if(name.includes("\n")) {
        name.replace("\n", "");
        console.log("replace");
    }
    */
    
    // Each time an addToCart button is pressed, an item + an index marking what item it is in the local storage
    // If the index for the item does not exist, then
    /*
    for(var i = 0; i <= ((sessionStorage.length - 1)/3); i++) {
        if(sessionStorage.getItem("item" + i) === name) {
            index = i;
            console.log(index + " " + i);
            break;
        } else {
            index++;
            console.log(index + " " + i);
        }
    }*/
    /*
    if(sessionStorage.getItem("item" + index) === null) {
        quantity = 1;
        sessionStorage.maxindex++;
    } else {
        quantity++;
    }
    */

}

// Primary cart element. SessionStorage is used as a 'cookie' to save information across seperate tabs.
function addCartElement(name, price, quantity, img) {
    var cartRow = document.createElement("div");
    cartRow.classList.add("cartrow"); // Add css class to new div
    var cartItems = document.getElementsByClassName("items")[0];
    
    // Check if item already in cart by looping through all cart item names
    var cartNames = cartItems.getElementsByClassName("cartitemtitle");
    
    // If already in cart, then increase quantity 
    var index = 0;
    for(var i = 0; i < cartNames.length; i++) {
        if(cartNames[i].innerText === name) {
            var newquantity = Number(sessionStorage.getItem("quantity" + i)) + Number(quantity);
            sessionStorage.setItem("quantity" + i, newquantity);
            document.getElementsByClassName("cartquantity")[i].value = newquantity;
            sessionStorage.cartNum = Number(sessionStorage.cartNum)+1;
            update();
            return;
        }
        index = i + 1;
    }
    
    // If item is new, then store it's values with a index to be re-loaded when current page is unloaded
    sessionStorage.cartNum = Number(sessionStorage.cartNum) + 1;
    sessionStorage.setItem("item" + index, name);
    sessionStorage.setItem("price" + index, price);
    sessionStorage.setItem("quantity" + index, quantity);
    sessionStorage.setItem("index" + index, index);
    sessionStorage.setItem("imgsrc" + index, img);
    sessionStorage.maxindex = Number(sessionStorage.maxindex) + 1;
    
    var addCartRowContents = `
        <img class="cartitemimg" src="${img}">
        <div class="cartitemtitle">${name}</div>
        <div class="cartitemprice">${price}</div>
        <div class="cartitemquantity">
            <input class="cartquantity" type="number" value="${quantity}">
        </div>
        <div class="cartitemremove">
            <input class="removebutton" type="button" value="Remove">
        </div>
        <div class="hiddenindex">${index}</div>
        <br>
    `;
    
    cartRow.innerHTML = addCartRowContents;
    cartItems.append(cartRow);
    update();

}

function removeCartItem(event) {
    var button = event.target;
    var item = button.parentElement.parentElement;
    var name = item.getElementsByClassName("cartitemtitle")[0].innerText;
    var index = item.getElementsByClassName("hiddenindex")[0].innerText;
    console.log("remove " + name);
    
    item.style.width = "0px";
    item.remove();
    
    sessionStorage.cartNum = Number(sessionStorage.cartNum) - 1;
    sessionStorage.removeItem("item" + index);
    sessionStorage.removeItem("price" + index);
    sessionStorage.removeItem("quantity" + index);
    sessionStorage.maxindex = Number(sessionStorage.maxindex) - 1;
    
    updateCartTotal();
    
}

function updateCartTotal() {
    var total = document.getElementsByClassName("carttotal")[0];
    var cartRows = document.getElementsByClassName("cartrow");
    var totalAmount = 0;
    for(var i = 0; i < cartRows.length; i++) {
        var cartrow = cartRows[i];
        var priceElement = cartrow.getElementsByClassName("cartitemprice")[0];
        var quantityElement = cartrow.getElementsByClassName("cartquantity")[0];
        var price = Number(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        totalAmount += (price * quantity);
    }
    
    // toFixed was not working to format on its own
    var formatedTotal = Math.round(totalAmount*100)/100;
    formatedTotal.toFixed(2);
    var totalcontents = `Total: $${formatedTotal}`;
    total.innerHTML = totalcontents;
}

function updateQuantity(event) {
    var input = event.target;
    /*var quantity = input.getElementsByClassName("cartquantity")[0];*/
    var newquantity = input.value;
    var item = input.parentElement.parentElement;
    var index = item.getElementsByClassName("hiddenindex");
    var isNum = /^[0-9]+$/;
    
    if(newquantity.match(isNum) && Number(newquantity) !== 0) {
        sessionStorage.setItem("quantity" + index, newquantity);
        updateCartTotal();
    } else if(newquantity.match(isNum) && Number(newquantity) === 0) {
        removeCartItem(event);
    }
}

// RECIPE MAIN FUNCTIONS
/*
window.onload = getWidth;
window.onresize = getWidth;

// Get the width of the recipe thumbnail images
function getWidth() {
    if(sPage === "index.html") {
        var img = document.getElementsByClassName("textdivider");
        console.log("img width x height: " + img.length);
            var name = img[0].src;
            var width = img[0].width;
            var height = img[0].height;
            console.log(width + "x" + height + " src: " + name);
            resizeImg(img[0], width, height);
    }
    /*
    if(sPage === "3_recipe_main.html") {
        var img = document.getElementsByClassName("recipecardimg");
        console.log("img width x height: " + img.length);
        for(var i = 0; i < img.length; i++) {
            var name = img[i].src;
            var width = img[i].width;
            var height = img[i].height;
            console.log(width + "x" + height + " src: " + name);
            resizeImg(img[i], width, height);
        }
    }
    

}

function resizeImg(img, w, h) {
    // If height is not double width, then set height equal to that
    if(h !== (w * 0.2)) {
        var newheight = (w * 0.2);
        img.style.height = newheight + "px";
    }
}
*/


/******* LINK BUTTON SCRIPT ********/

function checkoutclick() {
    // Registered session storage variable is either 0 for false or 1 for true
    // Only set true after php server call back confirms
    if(Number(sessionStorage.registered) === 0) {
        if(sPage === "index.html") {
            location.href = "pages/5_registration.html";
        } else {
            location.href = "5_registration.html";
        }
    } else {
        if(sPage === "index.html") {
            location.href = "pages/6_checkout.html";
        } else {
            location.href = "6_checkout.html";
        }
    }
}

function clickchickpearecipe() {
    location.href = "pages/1_storepage.html";
}




/* Cookie script taken from quirksmode.org
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
 */



/******** STORE VALIDATION SCRIPT **********/
/* Store checkout data will be sent out to server to be written on database via AJAX 
 * HTTP request to PHP to send data to mySQL
 * 6_checkout.html page validation to confirm purchase and send items to be saved on server */





