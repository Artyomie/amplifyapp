/* 
 * 
 * Created on : Apr 19, 2021, 12:58:17 PM
 * Author     : artemlatypov
 * Javascript page for index site functions
 * 
 */

// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction();};

// Top of document (logo) and toolbar is set absolute, and replaced by fixed toolbar after scroll down
// Side navigation also scrolls down, and then set to be fixed after scrolling more than 80px
function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
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
        document.getElementById("iheader").style.top = "80px";
        document.getElementById("inav").style.position = "absolute";
        document.getElementById("inav").style.top = "128px";
        document.getElementById("sidenav").style.position = "absolute";
        document.getElementById("sidenav").style.top = "128px";
        document.getElementById("cartsummary").style.position = "absolute";
        document.getElementById("cartsummary").style.top = "128px";
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
    
    
// Cart open and close button

function openCart() {
    if(document.getElementById("cartsummary").style.width === "300px") {
        document.getElementById("cartsummary").style.width = "0px";
    } else {
        document.getElementById("cartsummary").style.width = "300px";
    }
}

// Check if DOM element are loaded before executing interacting code
document.addEventListener('readystatechange', function() {
    if (document.readyState === "complete") {
      ready();
    } else {
        /*document.addEventListener("DOMContentLoaded", ready);*/
    }
});

// Check what page is loaded
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

function ready() {
    loadCart();
    
    // Execute only if home page is loaded
    if(sPage === 'index.html') {
        
    }
    
}

// Card button link script
function clickrecipe1() {
    location.href = "pages/1_storepage.html";
}

// Initialize JSsession storage variables
if(!sessionStorage.cartNum) {
    sessionStorage.cartNum = 0;
}
/*
window.onunload = function() {
    localStorage.clear();
}; */

// Storepage script

var object1 = 0;

function buybuttonclick_1() {
    sessionStorage.cartNum = Number(sessionStorage.cartNum)+1;
    document.getElementById("add").innerHTML= sessionStorage.cartNum;
    loadCart();
}

function loadCart() {
    document.getElementById("cart").innerHTML = "Cart (" + sessionStorage.cartNum + ")";
}


