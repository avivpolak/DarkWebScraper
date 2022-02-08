import { Request, Response } from "express";
export declare const getAllPastes: (req: Request, res: Response) => Promise<Response | undefined>;
export declare const deleteAllPastes: (req: Request, res: Response) => Promise<Response | undefined>;
export declare const getPastesByQuery: (req: Request, res: Response) => Promise<Response | undefined>;
