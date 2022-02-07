import * as fs from "fs";
import path from "path";

export const  saveToDb=async(data:any)=>{
    //open new diractory to save the data
    const currentDate = Date.now().toString();
    const dir = path.join(__dirname, "../../../../darkwebDb/");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    //save the data to the file
    const filePath = path.join(dir, `${currentDate}.json`);
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        }
    }
    );
}

export const readFromDb = async (): Promise<any> => {
    try {
        const dir = path.join(__dirname, "../../../../darkwebDb/");
        const files = fs.readdirSync(dir);
        const data:any = {};
        for(let file of files){
            const filePath = path.join(dir,file);
            const extractedFile = await fs.readFileSync(filePath, "utf8");
            data[file]=JSON.parse(extractedFile);
        }
        return data;
    } catch (error) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
}

