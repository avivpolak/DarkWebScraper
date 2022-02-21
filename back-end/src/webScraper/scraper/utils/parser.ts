import parse from "node-html-parser";
import { Config } from "../../../types/config";
import { extractDataFromText } from "./regex";
import { Pastes, Paste } from "../../../types/pastes";
import { Params } from "../../../types/config";
import { HTMLElement } from "node-html-parser";


export const parseHtmlToObject = (
    html: string,
    config: Config
): Pastes | undefined => {
    const parseResult = parse(html);
    if (parseResult) {
        const posts = parseResult.querySelectorAll(config.allPosts.selector);
        
        const analyzedPosts = getPastesList(posts, config.params);
        if (analyzedPosts.length > 0) {
            return analyzedPosts;
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }
};


const getPastesList = (pasPastes: HTMLElement[], params: Params): Pastes => {
    const analyzedPastes: Pastes = [];
    for (let Paste of pasPastes) {
        try {
            const analyzedPaste = getPasteFromHtml(Paste, params);
            if (analyzedPaste && Object.keys(analyzedPaste).length > 0) {
                analyzedPastes.push(analyzedPaste);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return analyzedPastes;
};

const getPasteFromHtml = (
    Paste: HTMLElement,
    params: Params
): Paste | undefined => {
    try {
        const analyzedPaste: Paste = {};
        for (let param in params) {
            const htmlElement = Paste.querySelector(params[param].selector);
            if (htmlElement) {
                const htmlText = htmlElement.textContent;
                if (htmlText) {
                    const Paste = extractDataFromText(
                        htmlText.trim(),
                        params[param].regex
                    );
                    if (Paste) {
                        analyzedPaste[param] = Paste;
                    }
                }
            }
        }
        return analyzedPaste;
    } catch (error: unknown) {
        console.log(error)
        if (typeof error === "string") {
     
            throw new Error(error);
        }
    }
};
