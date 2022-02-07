"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//express server
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
//routes
const analyzedPosts_1 = __importDefault(require("./routes/analyzedPosts"));
app.use("/", analyzedPosts_1.default);
//listen
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
//export
exports.default = app;
