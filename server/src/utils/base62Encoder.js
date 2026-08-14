// Base62 characters: 26 lowercase + 26 uppercase + 10 numbers = 62
const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const BASE = ALPHABET.length;

/**
 * Converts a database integer ID into a Base62 short string
 * Example: ID 125 -> short string "cb"
 */
function encodeId(num) {
    if (num === 0) return ALPHABET[0];

    let str = "";
    while (num > 0) {
        str = ALPHABET[num % BASE] + str;
        num = Math.floor(num / BASE);
    }
    return str;
}

/**
 * Converts a Base62 short string back into the database integer ID
 * Example: short string "cb" -> ID 125
 */
function decodeId(str) {
    let num = 0;
    for (let i = 0; i < str.length; i++) {
        num = num * BASE + ALPHABET.indexOf(str.charAt(i));
    }
    return num;
}

module.exports = {
    encodeId,
    decodeId
};