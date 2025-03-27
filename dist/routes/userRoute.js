"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRoute = (0, express_1.Router)();
userRoute.get("/register", userController_1.registerUser);
userRoute.get("/login", userController_1.authUser);
userRoute.get("/login", userController_1.logout);
exports.default = userRoute;
//# sourceMappingURL=userRoute.js.map