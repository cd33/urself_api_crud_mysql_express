// import { db } from "../app";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// export const login = (req: any, res: any) => {
//   console.log("req.body :>> ", req.body);
//   res.send({
//     token: "test123",
//   });
// };

// export const register = (req: any, res: any) => {
//   const { name, email, password, passwordConfirmation } = req.body;

//   db.query(
//     "SELECT email FROM users WHERE email = ?",
//     [email],
//     async (error, result) => {
//       if (error) {
//         res.status(500).send({ error: "Something failed" });
//       }
//       if (result.length > 0) {
//         return res.status(500).send({
//           error: "Email already exist", // remplacer par une erreur quelconque non custom
//         });
//       } else if (password !== passwordConfirmation) {
//         return res.status(500).json({ error: "Passwords don't match" });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);
//       db.query(
//         "INSERT INTO users SET ?",
//         { name, email, password: hashedPassword },
//         (error) => {
//           if (error) {
//             res.status(500).send({ error: "Something failed" });
//           } else {
//             res.status(200).send({
//               message: "User registered",
//             });
//           }
//         }
//       );
//     }
//   );
// };
