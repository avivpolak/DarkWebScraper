"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = void 0;
const cliProgress = require("cli-progress");
const bar = (text) => new cliProgress.SingleBar({ format: text + "{bar}" + " {percentage}% || {value}/{total}" }, cliProgress.Presets.shades_grey);
exports.bar = bar;
//# sourceMappingURL=progressBar.js.map