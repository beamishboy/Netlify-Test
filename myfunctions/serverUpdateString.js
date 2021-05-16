exports.handler = async function (event) {

    // const { CHARS_BETWEEN, ALPHABET_SEPARATION } = process.env;
    // const charsBetween = parseInt(CHARS_BETWEEN);
    // const alphabetSeparation = parseInt(ALPHABET_SEPARATION);
    // const initString = event.queryStringParameters.input;

    // const rootUnicode = initString.charCodeAt(0);
    // const finalUnicode = "A".charCodeAt(0) + (rootUnicode - "A".charCodeAt(0) + alphabetSeparation) % 26;


    // const finalChar = String.fromCharCode(finalUnicode);

    // const stringArray = initString.split("");
    // const index = charsBetween + 1;
    // stringArray[index] = finalChar;

    // const stringToReturn = stringArray.join("") + "#SIG#"


    const response = {
        statusCode: 200,
        body: JSON.stringify("#SIGNATURERESPONSE"),
    }

    return response;
}
