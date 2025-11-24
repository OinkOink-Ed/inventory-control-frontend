import { execSync } from "child_process";
import { getApiSwagger } from "./getApiSwagger";

async function main() {
  console.log("📥 Generating API schema...");
  await getApiSwagger();
  console.log("✅ Schema Generated Complete");

  console.log("🔧 Generating API client...");
  execSync("npx kubb generate");
  console.log("✅ Client Generated Complete");

  console.log("🔍 Type-checking generated API...");
  execSync("npx tsc --noEmit");
  console.log("✅ Type check Complete");

  console.log("🎨 Transformation of types into interfaces...");
  execSync("npx eslint src/shared/api/generated --fix");
  console.log("✅ Transformation Complete");

  console.log("🎉 All done! API successfully generated and validated.");
}

void main();
