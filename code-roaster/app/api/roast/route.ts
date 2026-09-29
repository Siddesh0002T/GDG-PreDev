import { NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import type { LanguageId, RoastLevel } from "@/types/roast";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const code = typeof body.code === "string" ? body.code : "";
  const errorMessage =
    typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";
  const persona = typeof body.persona === "string" ? body.persona : undefined;

  // Validation 1: empty code
  if (!code.trim()) {
    return NextResponse.json(
      { error: "No code provided. I can't roast the void." },
      { status: 400 }
    );
  }

  // Validation 2: code length limit
  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code is too long (${code.length.toLocaleString()} characters). Limit is ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Validation 3: error message length limit
  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message is too long (${errorMessage.length.toLocaleString()} characters). Limit is ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Sanitize language and roastLevel
  const validLanguages = LANGUAGES.map((l) => l.id) as readonly string[];
  const validRoastLevels = ROAST_LEVELS.map((r) => r.id) as readonly string[];

  const language = (
    typeof body.language === "string" && validLanguages.includes(body.language)
      ? body.language
      : DEFAULTS.language
  ) as LanguageId;

  const roastLevel = (
    typeof body.roastLevel === "string" &&
    validRoastLevels.includes(body.roastLevel)
      ? body.roastLevel
      : DEFAULTS.roastLevel
  ) as RoastLevel;

  try {
    const result = await analyzeCode({
      language,
      code,
      roastLevel,
      errorMessage: errorMessage || undefined,
      persona,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("[api/roast] Analysis error:", err);
    const message =
      err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
