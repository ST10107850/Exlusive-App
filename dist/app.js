"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const env_const_1 = require("./constants/env.const");
const app = (0, express_1.default)();
app.use("/users", userRoute_1.default);
app.listen(env_const_1.PORT, () => {
    console.log("http://localhost:7000");
});
