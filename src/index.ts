//express server
import express from "express";
const app = express();
const port = 3000;

//routes
import analyzedPostsRouter from "./routes/analyzedPosts";
app.use("/", analyzedPostsRouter);

//listen
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

//export
export default app;

