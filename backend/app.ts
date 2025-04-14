import express from "express";
import cookieParser from "cookie-parser";
import { dbConnection } from "./config/dbConnection";
import { errorHandle, notFound } from "./middleware/errorMiddleware";
import userRoute from "./routes/userRoute";
import categoryRoute from "./routes/categoryRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import orderRoute from "./routes/orderRoute";
import bodyParser from "body-parser";
import cors from "cors";

import dotenv from "dotenv"

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "https://urban-jungle.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);

app.use(notFound);
app.use(errorHandle);



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  dbConnection();
});


