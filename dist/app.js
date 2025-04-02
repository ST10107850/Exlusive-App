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
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/users", userRoute_1.default);
app.use("/api/category", categoryRoute_1.default);
app.use("/api/product", productRoute_1.default);
app.use("/api/cart", cartRoute_1.default);
app.use("/api/orders", orderRoute_1.default);
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandle);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    (0, dbConnection_1.dbConnection)();
});
//# sourceMappingURL=app.js.map