import { Request, Response } from "express";
declare const getAnalyzedPosts: (req: Request, res: Response) => Promise<Response | undefined>;
export default getAnalyzedPosts;
