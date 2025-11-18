import axios from "axios";
import { writeFile } from "fs/promises";
import path from "path";

export async function getApiSwagger() {
  try {
    const { data } = await axios.get<string>("http://backend:3000/docs-json", {
      responseType: "text",
    });

    await writeFile(path.resolve(process.cwd(), "./swaggerApi.json"), data);
  } catch (error) {
    console.log(error);
  }
}
