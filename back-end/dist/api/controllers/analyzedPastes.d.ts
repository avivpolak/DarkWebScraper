import { Request, Response } from "express";
export declare const getPagesPastes: (req: any, res: any) => Promise<any>;
export declare const deleteAllPastes: (req: Request, res: Response) => Promise<Response | undefined>;
export declare const getCount: (req: Request, res: Response) => Promise<Response | undefined>;
export declare const getLabelsStatistics: (req: Request, res: Response) => Promise<Response | undefined>;
export declare const getPastesByQuery: (req: any, res: any) => Promise<any>;
