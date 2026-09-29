import { Type, type Schema } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "Witty, observational Hinglish critique of the submitted code.",
    },
    roastScore: {
      type: Type.INTEGER,
      description: "Humorous roast severity score from 10 to 99.",
    },
    scoreBadge: {
      type: Type.STRING,
      description: "Punchy short 2-4 word rubber stamp rating phrase.",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of identified issues sorted by severity.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number of the code where the issue occurs.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity level of the problem.",
          },
          title: {
            type: Type.STRING,
            description: "Short punchy title for the problem.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact problem code extracted from the submission.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Hinglish explanation of what is breaking or smelling.",
          },
          expected: {
            type: Type.STRING,
            description: "Hinglish instruction on what the fix should be.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "The complete corrected code without markdown code blocks.",
    },
    takeaway: {
      type: Type.STRING,
      description: "A witty, memorable conclusion takeaway.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
