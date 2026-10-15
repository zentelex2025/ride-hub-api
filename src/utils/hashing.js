import bcrypt from "bcrypt";

export function generateHashValue(plain_text) {
  const hash = bcrypt.hashSync(plain_text, 10);
  return hash;
}

export function compareHashedValue(plain_text, hash_text) {
  return bcrypt.compareSync(plain_text, hash_text);
}
