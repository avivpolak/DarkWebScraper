"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//express server
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonParser = body_parser_1.default.json();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const expressSanitizer = require('express-sanitizer');
const port = 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(expressSanitizer());
//routes
const analyzedPastes_1 = __importDefault(require("./routes/analyzedPastes"));
app.use("/api", jsonParser, analyzedPastes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '../../../front-end/build')));
//listen
const server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(async () => {
        console.log('HTTP server closed');
    });
});
//export
exports.default = app;
//# sourceMappingURL=index.js.map