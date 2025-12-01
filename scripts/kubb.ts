import { execSync } from "child_process";
import { getApiSwagger } from "./getApiSwagger";

async function main() {
  console.log("📥 Generating API schema...");
  await getApiSwagger();
  console.log("✅ Schema Generated Complete");

  console.log("🔧 Generating API client...");
  execSync("npx kubb generate");
  console.log("✅ Client Generated Complete");

  console.log("🎉 All done! API successfully generated and validated.");
}

void main();
