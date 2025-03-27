import express from "express";
import userRoute from "./routes/userRoute";

import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log("http://localhost:7000");
});
