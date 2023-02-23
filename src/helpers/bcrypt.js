import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export function comparePassword(password, hashedPassword) {
  const isCorrect = bcrypt.compareSync(password, hashedPassword);
  console.log("ISCORRECT:", isCorrect);
  return isCorrect;
}
