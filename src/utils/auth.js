import { compare, hash } from "bcryptjs";

async function hashedPassword(password) {
  const hashPassword = await hash(password, 12);
  return hashPassword;
}

async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export { hashedPassword, verifyPassword };
