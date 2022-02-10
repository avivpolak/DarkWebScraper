const spacyNLP = require("spacy-nlp");
// default port 6466

// start the server with the python client that exposes spacyIO (or use an existing socketIO server at IOPORT)
var serverPromise = spacyNLP.server({ port: 6466 });
// Loading spacy may take up to 15s