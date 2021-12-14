import { assert } from "console";
import { createHash } from "crypto";

const MIN_EMAIL_LEN = 6;
const MAX_EMAIL_LEN = 100;
const FR_EMAIL_LEN = Math.floor(MAX_EMAIL_LEN / 31) + 1;

function email_from_hash(secret: string): string {
  if (secret.length < MIN_EMAIL_LEN || secret.length > MAX_EMAIL_LEN) {
    throw new Error("Invalid secret length");
  }
  let lower_secret = secret.toLowerCase();
  let split = lower_secret.split("@", 2);
  if (split[1] == "gmail.com") {
    split[0].replace(".", "");
  }
  let hash = createHash('sha256').update(split[0]).update("@").update(split[1]);
  var i;
  var len = split[0].length + 1 + split[1].length;
  
  for (i = 0; i < FR_EMAIL_LEN * 31 - len; ++i) {
    hash = hash.update(new Uint8Array([0]));
  }
  let hash_res = hash.digest();
  let hash_res_rev = hash_res.reverse();
  hash_res_rev[31] &= 0x1f;
  return '0x' + hash_res_rev.toString('hex');
}

assert(email_from_hash("517669936@qq.com") == "0x60a5b3e17682a5899ae220f13cb2fefc9210bdb6212b86ac76b825c0446f3710")