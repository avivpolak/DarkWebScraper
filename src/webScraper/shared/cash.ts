import fs from "fs";
import path from "path";
import { Config } from "../../types/config";
import { Cash } from "../../types/general";
export const writeCash = async (data: string[], config: Config) => {
    const dataToSave = { data, config };
    const cashPath = path.join(__dirname, `../${config.name}.json`);

    fs.writeFile(cashPath, JSON.stringify(dataToSave), (err) => {
        if (err) {
            console.log(err);
        }
    });
};
export const readCash = async (
    configName: string
): Promise<Cash | undefined> => {
    try {
        return await JSON.parse(
            fs
                .readFileSync(path.join(__dirname, `../${configName}.json`))
                .toString()
        );
    } catch (error) {
        return undefined;
    }
};
