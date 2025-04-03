"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDoc = exports.updateDoc = exports.deleteOneDoc = exports.getAllDoc = exports.getPagination = exports.getOneDoc = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const HttpError_1 = __importDefault(require("../utils/HttpError"));
const http_codes_1 = require("../constants/http.codes");
const getOneDoc = (Model, populateFields = []) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let query = Model.findById(req.params.id);
    const requestedPopulates = typeof req.query.populate === "string"
        ? req.query.populate.split(",")
        : [];
    const allPopulates = [...populateFields, ...requestedPopulates];
    if (allPopulates.length > 0) {
        query = query.populate(allPopulates);
    }
    const doc = yield query;
    if (!doc) {
        return next(new HttpError_1.default("No document found with that ID", http_codes_1.NOT_FOUND));
    }
    res.status(http_codes_1.OK).json({
        success: true,
        id: req.params.id,
        data: doc,
    });
}));
exports.getOneDoc = getOneDoc;
const getPagination = (Model, populateFields = []) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPage = Number(req.query.currentPage) || 1;
    const limit = Number(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
    const skip = (currentPage - 1) * limit;
    let query = Model.find({})
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit);
    populateFields.forEach((field) => {
        query = query.populate(field);
    });
    const doc = yield query;
    const totalCount = yield Model.countDocuments();
    if (!doc.length) {
        return next(new HttpError_1.default("No documents found", http_codes_1.NOT_FOUND));
    }
    res.status(http_codes_1.OK).json({
        success: true,
        data: doc,
        totalPages: Math.ceil(totalCount / limit),
        currentPage,
    });
}));
exports.getPagination = getPagination;
const getAllDoc = (Model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield Model.find({})
        .populate({
        path: "userId",
        select: "firstName lastName",
    })
        .sort({ createdAt: -1 });
    res.status(http_codes_1.OK).json({ success: true, result: doc.length, data: doc });
}));
exports.getAllDoc = getAllDoc;
const deleteOneDoc = (Model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield Model.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new HttpError_1.default("No document found with that ID", http_codes_1.NOT_FOUND));
    }
    res.status(http_codes_1.OK).json({ message: "Document deleted successfully" });
}));
exports.deleteOneDoc = deleteOneDoc;
const updateDoc = (Model, columnName = "") => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const columnValue = req.body[columnName];
    if (columnValue) {
        const existingColumn = yield Model.findOne({
            [columnName]: columnValue,
            _id: { $ne: req.params.id },
        });
        if (existingColumn) {
            throw new HttpError_1.default(`That ${columnName} already exists`, http_codes_1.CONFLICT);
        }
    }
    const doc = yield Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!doc) {
        return next(new HttpError_1.default("No document found with that ID", http_codes_1.NOT_FOUND));
    }
    res.status(http_codes_1.OK).json({
        status: "Document updated sucessfully",
        data: doc,
    });
}));
exports.updateDoc = updateDoc;
const getUserDoc = (Model, populateFields = "") => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id) {
        return next(new HttpError_1.default("User not found", http_codes_1.NOT_FOUND));
    }
    const queryCondition = Model.schema.paths.user
        ? { user: req.user._id }
        : { userId: req.user._id };
    let query = Model.find(queryCondition).sort({ createdAt: -1 });
    if (populateFields) {
        if (typeof populateFields === "string") {
            query = query.populate(populateFields);
        }
        else if (typeof populateFields === "object") {
            query = query.populate(populateFields);
        }
    }
    const doc = yield query.exec();
    res.status(200).json(doc);
}));
exports.getUserDoc = getUserDoc;
//# sourceMappingURL=crudHandlerFactory.js.map