import { Request, Response } from "express";
declare const scraper: (req: Request, res: Response) => Promise<void>;
export default scraper;
