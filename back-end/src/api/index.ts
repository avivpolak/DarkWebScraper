//express server
import path from "path"
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import express from "express";
import cors from "cors"
const expressSanitizer = require('express-sanitizer');


const port = 8080;
const app = express();

app.use(cors());
app.use(expressSanitizer());


//routes
import analyzedPastesRouter from "./routes/analyzedPastes";
app.use("/api",jsonParser, analyzedPastesRouter);
app.use(express.static(path.join(__dirname , '../view/build')));
//listen
const server =app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(async() => {
    console.log('HTTP server closed')
  })
})

//export
export default app;

