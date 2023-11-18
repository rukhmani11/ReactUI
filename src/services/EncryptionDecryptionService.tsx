import React from 'react'
import { AES, enc, mode, pad } from 'crypto-js';

const secretKey = '$ThomeV98a9e7684';

function encrypt(value: string) {
 
    var key = enc.Utf8.parse(secretKey);
    var iv = enc.Utf8.parse(secretKey);
    var encrypted = AES.encrypt(enc.Utf8.parse(value.toString()), key,
        {
            secretKeyize: 128 / 8,
            iv: iv,
            mode: mode.CBC,
            padding: pad.Pkcs7
        });
    return encrypted.toString();
}

//The get method is use for decrypt the value.
function decrypt(value: string) {
    var key = enc.Utf8.parse(secretKey);
    var iv = enc.Utf8.parse(secretKey);
    var decrypted = AES.decrypt(value, key, {
        secretKeyize: 128 / 8,
        iv: iv,
        mode: mode.CBC,
        padding: pad.Pkcs7
    });
    return decrypted.toString(enc.Utf8);
}

export const encryptionDecryptionService = {
    encrypt,
    decrypt
};
