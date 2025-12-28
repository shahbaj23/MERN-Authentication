import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export default authUser;
