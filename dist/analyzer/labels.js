"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabels = void 0;
const spacyNLP = require("spacy-nlp");
const nlp = spacyNLP.nlp;
const getLabels = async () => {
    // Available options are count (returns the total count) and text (returns the parsed strings) You can specify one or both.
    const options = ["count"];
    // Note you can pass multiple sentences concat in one string.
    const output = await nlp
        .parse_time("On 22 June 1941, the European Axis powers launched an invasion of the Soviet Union, opening the largest land theatre of war in history, which trapped the Axis, most crucially the German Wehrmacht, into a war of attrition. World War II (often abbreviated to WWII or WW2), also known as the Second World War, was a global war that lasted from 1939 to 1945.", options);
    console.log(output);
};
exports.getLabels = getLabels;
//# sourceMappingURL=labels.js.map