"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const crypto_1 = require("crypto");
const MIN_EMAIL_LEN = 6;
const MAX_EMAIL_LEN = 100;
const FR_EMAIL_LEN = MAX_EMAIL_LEN / 31 + 1;
function email_from_hash(secret) {
    if (secret.length < MIN_EMAIL_LEN || secret.length > MAX_EMAIL_LEN) {
        throw new Error("Invalid secret length");
    }
    let lower_secret = secret.toLowerCase();
    let split = lower_secret.split("@", 2);
    if (split[1] == "gmail.com") {
        split[0] = split[0].toLowerCase();
        split[0].replace(".", "");
    }
    let hash = (0, crypto_1.createHash)('sha256').update(split[0]).update("@").update(split[1]);
    var i = 0;
    for (i = 0; i < FR_EMAIL_LEN * 31 - lower_secret.length; i++) {
        hash.update("0");
    }
    let hash_res = hash.digest();
    let hash_res_rev = hash_res.reverse();
    hash_res_rev[31] &= 0x1f;
    return '0x' + hash_res_rev.toString('hex');
}
(0, console_1.assert)(email_from_hash("517669936@qq.com") == "0x60a5b3e17682a5899ae220f13cb2fefc9210bdb6212b86ac76b825c0446f3710");
//# sourceMappingURL=index.js.map