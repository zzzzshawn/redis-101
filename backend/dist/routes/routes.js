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
const express_1 = require("express");
const redis_1 = __importDefault(require("../redis"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ msg: "get all todos route" });
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todo } = req.body;
    if (!todo)
        res.json({ success: false, data: "Missing todo" });
    try {
        yield redis_1.default.lPush("todos", JSON.stringify(todo));
        res.json({ success: true, data: todo });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, data: error });
    }
}));
exports.default = router;
