"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regex_1 = require("./regex");
const getPastesFromHtml = (pasPastes, params) => {
    const analyzedPastes = [];
    for (let Paste of pasPastes) {
        try {
            const analyzedPaste = getPasteFromHtml(Paste, params);
            if (analyzedPaste && Object.keys(analyzedPaste).length > 0) {
                analyzedPastes.push(analyzedPaste);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return analyzedPastes;
};
const getPasteFromHtml = (Paste, params) => {
    try {
        const analyzedPaste = {};
        for (let param in params) {
            const htmlElement = Paste.querySelector(params[param].selector);
            if (htmlElement) {
                const htmlText = htmlElement.textContent;
                if (htmlText) {
                    const Paste = (0, regex_1.extractDataFromText)(htmlText.trim(), params[param].regex);
                    if (Paste) {
                        analyzedPaste[param] = Paste;
                    }
                }
            }
        }
        return analyzedPaste;
    }
    catch (error) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
};
exports.default = getPastesFromHtml;
