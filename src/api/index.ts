//express server
import express from "express";
const app = express();
const port = 3000;


//routes
import analyzedPastesRouter from "./routes/analyzedPastes";
app.use("/", analyzedPastesRouter);

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

