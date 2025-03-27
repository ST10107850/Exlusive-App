import express from "express";
import cookieParser from "cookie-parser";
import { dbConnection } from "./config/dbConnection";
import { errorHandle, notFound } from "./middleware/errorMiddleware";
import userRoute from "./routes/userRoute";
import categoryRoute from "./routes/categoryRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import orderRoute from "./routes/orderRoute";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = Number(process.env.PORT) || 7000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port ${PORT}`);
  dbConnection();
});

app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
