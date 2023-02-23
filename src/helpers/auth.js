// @ts-nocheck
import jwt from "jsonwebtoken";

export async function jwtSign(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export function jwtVerify(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
}
