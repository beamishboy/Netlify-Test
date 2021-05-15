exports.handler = async function (event) {

    const { CHARS_BETWEEN, ALPHABET_SEPARATION } = process.env;
    const charsBetween = CHARS_BETWEEN;
    const alphabetSeparation = ALPHABET_SEPARATION;
    const initString = event.queryStringParameters.input;

    const rootUnicode = initString.charCodeAt(0);
    const finalUnicode = "A".charCodeAt(0) + (rootUnicode - "A".charCodeAt(0) + alphabetSeparation) % 26;
    const finalChar = String.fromCharCode(finalUnicode);

    const stringArray = initString.split("");
    //stringArray[charsBetween + 1] = finalChar;

    const stringToReturn = stringArray[charsBetween + 1];


    const response = {
        statusCode: 200,
        body: JSON.stringify(stringToReturn),
    }

    return response;
}
