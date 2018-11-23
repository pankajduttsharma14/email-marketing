// var AES = require("crypto-js/aes");
// var SHA256 = require("crypto-js/sha256");
var CryptoJS = require("crypto-js");

function EncryptionService(data)
{
    var ciphertext = CryptoJS.AES.encrypt(data, 't6w9z$C&F)J@McQf');
    return ciphertext;
}

function DycryptionService(data)
{
    var bytes  = CryptoJS.AES.decrypt(data.toString(), 't6w9z$C&F)J@McQf');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}

export const EncryptionModule={EncryptionService,DycryptionService};


