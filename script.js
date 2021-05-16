const deploy = "netlify"  //Possible valid values are "local" and "netlify"
console.log(`Deployment environment is set to ${deploy}`);
const stringLength = 20;
const alphabetSeparation = 3;
const charsBetween = 4;
const stringToUpdate = "THISISATESTSTRING";
const outputEl = document.querySelector(".random-output");

function generateRandomCharacter() {
    const alphabetNum = Math.floor(Math.random() * 26);   //return number between 0 and 25 (inclusive);
    const startUnicode = "A".charCodeAt(0);
    return String.fromCharCode(startUnicode + alphabetNum);
}

function generateRandomString() {
    var retString = "";
    for (i = 0; i < stringLength; i++) {
        retString += generateRandomCharacter();
    }
    return retString;
}
function postString(theString) {
    outputEl.innerHTML = "<pre>" + theString.split("").join("  ") + "</pre>";
}

async function postRandomString() {
    const stringToUpdate = generateRandomString();
    var stringToPost = "Initial";
    if (deploy === "local") {
        stringToPost = updateString(stringToUpdate);
    }
    else if (deploy === "netlify") {
        updateVisuals("0", "0", "0");

        const config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        };
        console.log(`Initial string: ${stringToUpdate}`)
        const res = await fetch(`https://netlifytestserverless.netlify.app/.netlify/functions/serverUpdateString?input=${stringToUpdate}`, config);
        updateVisuals("1", "1", "1");
        const data = await res.json();

        const statusCode = res.status;
        console.log(`Status Code Received is: ${statusCode}`)

        const firstChar = Math.floor(statusCode / 100);
        const secondChar = Math.floor((statusCode % 100) / 10);
        const thirdChar = statusCode % 10;

        //updateVisuals("\u03A6", "\u03A6", "\u03A6");
        updateVisuals(firstChar, secondChar, thirdChar);
        console.log(data);

        stringToPost = data;
    }
    else {
        stringToPost = "##ERROR##";
        updateVisuals("#", "#", "#");
    }

    postString(stringToPost);
}

const buttonEl = document.querySelector(".btn");
buttonEl.addEventListener("click", postRandomString)

function updateString(initString) {
    const rootUnicode = initString.charCodeAt(0);
    const finalUnicode = "A".charCodeAt(0) + (rootUnicode - "A".charCodeAt(0) + alphabetSeparation) % 26;
    const finalChar = String.fromCharCode(finalUnicode);

    const stringArray = initString.split("");
    stringArray[charsBetween + 1] = finalChar;

    updateVisuals(initString.charAt(0), initString.charAt(charsBetween + 1), stringArray[charsBetween + 1]);

    return stringArray.join("");
}



function updateVisuals(first, modifiable, modified) {
    document.querySelector("#first-char").innerHTML = first;
    document.querySelector("#modifiable-char").innerHTML = modifiable;
    document.querySelector("#modified-char").innerHTML = modified;
}



