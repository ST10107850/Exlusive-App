import express from "express";
import userRoute from "./routes/userRoute";
import { PORT } from "./constants/env.const";

const app = express();

app.use("/users", userRoute);


app.listen(PORT, () => {
    console.log("http://localhost:7000");
})