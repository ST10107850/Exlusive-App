import express from "express";
// import cookieParser from "cookie-parser";
// import { dbConnection } from "./config/dbConnection";
// import { errorHandle, notFound } from "./middleware/errorMiddleware";
// import userRoute from "./routes/userRoute";
// import categoryRoute from "./routes/categoryRoute";
// import productRoute from "./routes/productRoute";
// import cartRoute from "./routes/cartRoute";
// import orderRoute from "./routes/orderRoute";
// import bodyParser from "body-parser";
// import cors from "cors";
import dotenv from "dotenv"

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/message", (req, res) => {
  res.send("Hello World");
});

// app.use(cookieParser());

// app.use(cors())

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// app.use("/api/users", userRoute);
// app.use("/api/category", categoryRoute);
// app.use("/api/product", productRoute);
// app.use("/api/cart", cartRoute);
// app.use("/api/orders", orderRoute);

// app.use(notFound);
// app.use(errorHandle);



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  // dbConnection();
});


