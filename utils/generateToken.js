import jwt from "jsonwebtoken";

function generateToken(id) {
  const token = jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_PRIVATE_KEY);
  return token;
}

export default generateToken;
