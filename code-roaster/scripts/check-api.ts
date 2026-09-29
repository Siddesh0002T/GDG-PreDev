import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log(`[Code Roaster] Testing Gemini API connection with model: ${AI.model}...`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n✅ SUCCESS: Gemini API responded correctly!");
    console.log("-----------------------------------------");
    console.log(`Roast Score: ${result.roastScore}/100 [${result.scoreBadge}]`);
    console.log(`\nRoast Critique:\n"${result.roast}"`);
    console.log(`\nIssues Identified: ${result.issues.length}`);
    result.issues.forEach((issue, idx) => {
      console.log(`  ${idx + 1}. [${issue.severity}] Line ${issue.line}: ${issue.title}`);
    });
    console.log(`\nTakeaway:\n"${result.takeaway}"`);
    console.log("\nCorrected code preview:\n" + result.correctedCode.slice(0, 150) + "...\n");
  } catch (error) {
    console.error("\n❌ FAILED to verify Gemini API:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
