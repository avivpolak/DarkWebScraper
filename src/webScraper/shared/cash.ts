import fs from "fs";
import path from "path";
export const writeCash = async ( data: string[]) => {
    fs.writeFile(
        path.join(__dirname,"../urls.json",),
        JSON.stringify(data),
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    );
};
export const readCash = async (): Promise<string[]> => {
    return await JSON.parse(
        fs.readFileSync(path.join(__dirname, "../urls.json",)).toString()
    );
};
