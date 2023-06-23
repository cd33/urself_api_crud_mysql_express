// import db from "../config/database";
// import { getRolesQuery } from "../auth/auth.queries";

// export const checkRolesExisted = (req: any, res: any, next: any) => {
//     if (req.body.roles) {
//       db.query(getRolesQuery, [], async (error, result) => {
//         if (error) {
//           return res.status(500).json({
//             success: 0,
//             message: "Database connection error",
//           });
//         }
//         const roles = result.map((r: any) => r.name);
//         for (let i = 0; i < req.body.roles.length; i++) {
//           if (!roles.includes(req.body.roles[i])) {
//             return res.status(400).json({
//               success: 0,
//               message: `Failed: ${req.body.roles[i]} does not exist`,
//             });
//           }
//         }
//         next();
//       });
//     } else {
//       next();
//     }
//   };
