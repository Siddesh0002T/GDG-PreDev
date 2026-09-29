import { GoogleGenAI, ApiError } from "@google/genai";
import { AI } from "@/config/app.config";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import type { RoastRequest, RoastResult } from "@/types/roast";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const rawMessage = error instanceof Error ? error.message : String(error);

  switch (status) {
    case 400:
      return `Invalid request to Gemini API (400). Please check input formatting. Details: ${rawMessage}`;
    case 403:
      return "Access denied (403). Check that your GEMINI_API_KEY in .env.local has access to the requested model.";
    case 404:
      return `Model not found (404). Check AI.model in config/app.config.ts (currently '${AI.model}').`;
    case 429:
      return "Rate limit exceeded (429). Bhai thoda ruk jao, Gemini is taking a quick chai break!";
    case 503:
      return "Gemini service temporarily overloaded (503). Retried but server is busy. Please try again shortly.";
    default:
      return `Gemini API error${status ? ` (${status})` : ""}: ${rawMessage}`;
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const contents = buildUserPrompt(request);

  let lastError: unknown = null;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || !responseText.trim()) {
        throw new Error("Received an empty response from Gemini.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(responseText);
      } catch (jsonErr) {
        throw new Error(`Failed to parse Gemini response as JSON: ${String(jsonErr)}`);
      }

      return {
        roast: parsed.roast ?? "Bhai, code dekh ke bolti bandh ho gayi! 😅",
        roastScore: typeof parsed.roastScore === "number" ? parsed.roastScore : 72,
        scoreBadge: parsed.scoreBadge ?? "ATTENDANCE SHORT, CODE BHI SHORT",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? request.code,
        takeaway:
          parsed.takeaway ??
          "Chinta mat kar bhau. Code bhi gym jaisa hai — practice se better hota hai! 🚀",
      };
    } catch (err: unknown) {
      lastError = err;
      const status = err instanceof ApiError ? err.status : undefined;

      if (status === 503 && attempt < AI.maxAttempts) {
        const backoffMs = attempt * 1000;
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
        continue;
      }

      throw new Error(friendlyErrorMessage(status, err));
    }
  }

  throw new Error(friendlyErrorMessage(undefined, lastError));
}
