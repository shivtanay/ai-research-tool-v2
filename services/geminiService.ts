
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

// @ts-ignore - Vite environment variable
const viteEnv = import.meta.env;

const apiKey = viteEnv.VITE_GEMINI_API_KEY || null;

if (!apiKey) {
  console.warn("GEMINI_API_KEY not configured. Some features may not work. Please set VITE_GEMINI_API_KEY environment variable.");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    patternsAndTrends: {
      type: Type.ARRAY,
      description: "Key patterns and emerging trends identified in the literature.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A concise title for the pattern or trend." },
          description: { type: Type.STRING, description: "A detailed explanation of the pattern or trend." },
        },
        required: ["title", "description"],
      },
    },
    researchGaps: {
      type: Type.ARRAY,
      description: "Notable gaps or unanswered questions in the current body of research.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A concise title for the research gap." },
          description: { type: Type.STRING, description: "A detailed explanation of the research gap." },
        },
        required: ["title", "description"],
      },
    },
    hypotheses: {
      type: Type.ARRAY,
      description: "Novel, plausible hypotheses generated from the analysis.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A concise title for the hypothesis." },
          description: { type: Type.STRING, description: "A detailed explanation of the hypothesis and its basis." },
        },
        required: ["title", "description"],
      },
    },
    suggestedExperiments: {
      type: Type.ARRAY,
      description: "Specific, corresponding experiments to test the generated hypotheses.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A concise title for the experiment." },
          description: { type: Type.STRING, description: "A brief overview of the experiment's objective." },
          methodology: { type: Type.STRING, description: "A suggested methodology or approach for conducting the experiment." },
        },
        required: ["title", "description", "methodology"],
      },
    },
  },
  required: ["patternsAndTrends", "researchGaps", "hypotheses", "suggestedExperiments"],
};

export const analyzeLiterature = async (topic: string, disciplines: string[]): Promise<AnalysisResult> => {
  if (!ai) {
    throw new Error("Gemini API key is not configured. Please set VITE_GEMINI_API_KEY environment variable.");
  }

  const disciplineList = disciplines.join(', ');
  const prompt = `
    Act as an expert virtual scientist's assistant. Your task is to autonomously scan, analyze, and synthesize scientific research literature.

    Research Topic: "${topic}"
    Relevant Disciplines: ${disciplineList}

    Based on your analysis of existing academic publications, provide the following in a structured format:
    1.  **Identify Patterns and Emerging Trends:** What are the recurring themes, common findings, or new directions in this field?
    2.  **Pinpoint Research Gaps:** What questions remain unanswered? Where is the current research lacking?
    3.  **Generate Plausible New Hypotheses:** Based on the identified patterns and gaps, formulate at least 3 novel and testable hypotheses.
    4.  **Suggest Corresponding Experiments:** For each hypothesis, propose a concrete experiment or research direction to validate it.

    Ensure your output is comprehensive, insightful, and grounded in scientific reasoning.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    // It's already an object because of responseMimeType
    const parsedResult = JSON.parse(jsonText);
    
    // Basic validation to ensure the structure matches AnalysisResult
    if (
      !parsedResult.patternsAndTrends ||
      !parsedResult.researchGaps ||
      !parsedResult.hypotheses ||
      !parsedResult.suggestedExperiments
    ) {
      throw new Error("Received an incomplete or malformed response from the AI.");
    }

    return parsedResult as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the Gemini API.");
  }
};
