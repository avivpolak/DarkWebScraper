const spacyaNLP = require("spacy-nlp");

const nlp = spacyaNLP.nlp;

const label = async () => {
    console.log(await nlp.parse_named_entities("I am a cat"));
    // Note you can pass multiple sentences concat in one string.
    // nlp.parse("Bob Brought the pizza to Alice.").then((output:any) => {
    //     console.log(output);
    //     console.log(JSON.stringify(output[0].parse_tree, null, 2));
    // });

    // Store output into variable
    const result = await nlp.parse("Bob Brought the pizza to Alice.");
    console.log(result)
};
label()