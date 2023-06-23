import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./config/database";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

db.connect((error: Error) => {
  if (error) {
    console.log("Error :>> ", error);
  } else {
    console.log("MYSQL Connected...");
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", require("./auth/auth.router"));
app.use("/api/users", require("./users/user.router"));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
