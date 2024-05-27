// ==UserScript==
// @name        ChannaSwitch
// @version     1.0.1
// @namespace   https://AceLewis.com
// @description Change from production, development, and staging easily.
// @match       https://app.channable.com/*
// @match       https://staging.channable.com/*
// @match       http://localhost:4200/*
// @grant       GM_addStyle
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @updateURL   https://github.com/AlexCELewis/ChannaSwitch/raw/main/channaswitch.user.js
// @downloadURL https://github.com/AlexCELewis/ChannaSwitch/raw/main/channaswitch.user.js
// ==/UserScript==

const prod_url = 'https://app.channable.com/'
const staging_url = 'https://staging.channable.com/'
const dev_url = 'http://localhost:4200/'

const prod_button_html = '<button id="goToProd" type="button">P</button>'
const staging_button_html = '<button id="goToStaging" type="button">S</button>'
const dev_button_html = '<button id="goToDev" type="button">D</button>'

// Create buttons
var buttonsHtml = document.createElement('div');
buttonsHtml.innerHTML = prod_button_html + staging_button_html + dev_button_html;
buttonsHtml.setAttribute('id', 'myContainer');
document.body.appendChild(buttonsHtml);

// Allow buttons to be clicked and add callback function
document.getElementById("goToProd").addEventListener("click", GotToProd, false);
document.getElementById("goToStaging").addEventListener("click", GotToStaging, false);
document.getElementById("goToDev").addEventListener("click", GotToDev, false);

// Functions to replace the url and redirect.
function GotToProd(zEvent) {
    window.location.replace(window.location.href.replace(dev_url, prod_url).replace(staging_url, prod_url));
}

function GotToStaging(zEvent) {
    window.location.replace(window.location.href.replace(prod_url, staging_url).replace(dev_url, staging_url));
}

function GotToDev(zEvent) {
    window.location.replace(window.location.href.replace(prod_url, dev_url).replace(staging_url, dev_url));
}

// CSS for button
GM_addStyle(multilineStr(function() {
    /*!
        #myContainer {
            position:               absolute;
            top:                    0;
            left:                   0;
            font-size:              15px;
            background:             #171a21;
            border:                 0px outset black;
            margin:                 0px;
            opacity:                0.65;
            z-index:                99999;
            padding:                0px 0px;
        }
        #myButton {
            cursor:                 pointer;
        }
        #myContainer p {
            color:                  red;
            background:             white;
        }
    */
}));

function multilineStr(dummyFunc) {
    var mlStr = dummyFunc.toString();
    mlStr = mlStr.replace(/^[^\/]+\/\*!?/, '') // Strip function () { /*!
        .replace(/\s*\*\/\s*\}\s*$/, '') // Strip */ }
        .replace(/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
    ;
    return mlStr;
}
