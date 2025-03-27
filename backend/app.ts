import express from "express";
import userRoute from "./routes/userRoute";

import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 7000;


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use('/users', userRoute);
