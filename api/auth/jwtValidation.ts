import jwt from "jsonwebtoken";

export const jwtValidation = (req: any, res: any, next: any) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7); // Remove Bearer from string
    jwt.verify(token, process.env.JWT_KEY!, (err: any, decoded: any) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Invalid token",
        });
      } else {
        console.log('decoded :>> ', decoded);
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: 0,
      message: "Access denied: unauthorized user",
    });
  }
};
