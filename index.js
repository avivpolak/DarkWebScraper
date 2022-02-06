//express server
const express = require("express");
const app = express();
const port = 3000;

//routes
const scraperRouter = require("./routes/scraper");
app.use("/", scraperRouter);

//listen
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

//export
module.exports = app;

