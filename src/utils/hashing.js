import bcrypt, { hash } from "bcrypt";

export function generateHashValue(plain_text) {
  const hash = bcrypt.hashSync(plain_text, 10);
  return hash;
}

export function comparePassword(my_plain_password, hash_password) {
  return bcrypt.compareSync(my_plain_password, hash_password);
}
