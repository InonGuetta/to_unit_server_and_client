import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const [, token] = authHeader.split(" ");

    if (!token){
        return res.status(401).send({ message: "missing token" });
    } 

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).send({ message: "invalid or expired token" });
  }
}