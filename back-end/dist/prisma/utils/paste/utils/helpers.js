"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomColor = void 0;
const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
exports.getRandomColor = getRandomColor;
//# sourceMappingURL=helpers.js.map