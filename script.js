const deploy = "netlify"  //Possible valid values are "local" and "netlify"

const stringLength = 180;
const alphabetSeparation = 3;
const charsBetween = 4;

const outputEl = document.querySelector(".random-output");

function generateRandomCharacter() {
    const alphabetNum = Math.floor(Math.random() * 26);   //return number between 0 and 25 (inclusive);
    const startUnicode = "A".charCodeAt(0);
    return String.fromCharCode(startUnicode + alphabetNum);
}

function generateRandomString() {
    var retString = "";
    for (i = 0; i <= stringLength; i++) {
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

        // const config = {
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json',
        //     }
        // };

        const res = await fetch(`myfunctions/serverUpdateString?input=${stringToUpdate}`);
        updateVisuals("1", "1", "1");
        const data = await res.json();
        updateVisuals("2", "2", "2");
        stringToPost = data.retVal;
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



