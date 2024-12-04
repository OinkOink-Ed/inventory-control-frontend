import { execSync } from "child_process";
import { getApiSwagger } from "./getApiSwagger";

async function main(){
    console.log("Generating API schema");
    await getApiSwagger();
    console.log("Generated Complite");

    console.log("Generating API client");
    execSync("npx kubb");
    console.log("Generated Complite");

    console.log("Transformation of types into interfaces");
    execSync("npx eslint src/api/generated/types/*.ts --fix");
    console.log("Transformation Complite");
}

void main()