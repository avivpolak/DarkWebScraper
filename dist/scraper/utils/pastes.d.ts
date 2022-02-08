import { Pastes } from "../../types/pastes";
import { Params } from "../../types/config";
import { HTMLElement } from "node-html-parser";
declare const getPastesFromHtml: (pasPastes: HTMLElement[], params: Params) => Pastes;
export default getPastesFromHtml;
