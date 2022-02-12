//express server
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import express from "express";
import cors from "cors"


const port = 3000;

const app = express();

app.use(cors());


//routes
import analyzedPastesRouter from "./routes/analyzedPastes";
app.use("/",jsonParser, analyzedPastesRouter);

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

