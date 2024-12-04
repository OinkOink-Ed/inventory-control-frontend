import axios from "axios"
import { writeFile } from "fs/promises";
import path from "path";

export async function getApiSwagger(){
    try {
        const {data} = await axios.get<string>("http://localhost:3000/api-json", {responseType: "text"});

        await writeFile(path.resolve(process.cwd(), "./swaggerApi.json"), data);
    } catch (error) {
        console.log(error);
    };
};