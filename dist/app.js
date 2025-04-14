"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dbConnection_1 = require("./config/dbConnection");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const cartRoute_1 = __importDefault(require("./routes/cartRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cookie_parser_1.default)());
const allowedOrigins = [
    "http://localhost:9000",
    "https://urban-jungle.vercel.app",
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/users", userRoute_1.default);
app.use("/api/category", categoryRoute_1.default);
app.use("/api/product", productRoute_1.default);
app.use("/api/cart", cartRoute_1.default);
app.use("/api/orders", orderRoute_1.default);
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandle);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    (0, dbConnection_1.dbConnection)();
});
//# sourceMappingURL=app.js.map