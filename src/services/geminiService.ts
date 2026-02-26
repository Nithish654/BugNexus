import { GoogleGenAI, Type } from "@google/genai";
import { GenerateResponse, WebsiteType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const geminiService = {
  async generateReport(url: string, type: WebsiteType): Promise<GenerateResponse> {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Perform a comprehensive production-ready QA analysis for a ${type} website: ${url}.
        
        Context-specific testing requirements for ${type}:
        ${type === 'ecommerce' ? '- Check shopping cart functionality, product search, and checkout flow.' : ''}
        ${type === 'portfolio' ? '- Check project gallery, resume download, and contact links.' : ''}
        ${type === 'blog' ? '- Check article navigation, comment sections, and social sharing.' : ''}
        ${type === 'business' ? '- Check service listings, about page, and lead generation forms.' : ''}
        ${type === 'educational' ? '- Check course listings, student portal links, and resource downloads.' : ''}
        ${type === 'news' ? '- Check breaking news sections, category filters, and dynamic updates.' : ''}
        ${type === 'saas' ? '- Check landing page conversion elements, feature highlights, pricing tables, and login/signup flows.' : ''}

        You must return a JSON response that matches the following structure:
        {
          "success": true,
          "message": "QA Report Generated Successfully",
          "report": "Detailed Markdown report here...",
          "executiveSummary": {
            "overallScore": number (0-100),
            "healthGrade": "A-F",
            "riskLevel": "High" | "Medium" | "Low",
            "auditDate": "ISO date string",
            "issueBreakdown": { "high": number, "medium": number, "low": number }
          },
          "lighthouseScores": {
            "performance": { "score": number, "label": "Poor" | "Good" | "Excellent" },
            "accessibility": { "score": number, "label": "Poor" | "Good" | "Excellent" },
            "seo": { "score": number, "label": "Poor" | "Good" | "Excellent" },
            "bestPractices": { "score": number, "label": "Poor" | "Good" | "Excellent" }
          },
          "issues": [
            { "type": "string", "severity": "High" | "Medium" | "Low", "description": "string", "recommendation": "string", "businessImpact": "string" }
          ]
        }`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              success: { type: Type.BOOLEAN },
              message: { type: Type.STRING },
              report: { type: Type.STRING },
              executiveSummary: {
                type: Type.OBJECT,
                properties: {
                  overallScore: { type: Type.NUMBER },
                  healthGrade: { type: Type.STRING },
                  riskLevel: { type: Type.STRING },
                  auditDate: { type: Type.STRING },
                  issueBreakdown: {
                    type: Type.OBJECT,
                    properties: {
                      high: { type: Type.NUMBER },
                      medium: { type: Type.NUMBER },
                      low: { type: Type.NUMBER }
                    }
                  }
                }
              },
              lighthouseScores: {
                type: Type.OBJECT,
                properties: {
                  performance: {
                    type: Type.OBJECT,
                    properties: { score: { type: Type.NUMBER }, label: { type: Type.STRING } }
                  },
                  accessibility: {
                    type: Type.OBJECT,
                    properties: { score: { type: Type.NUMBER }, label: { type: Type.STRING } }
                  },
                  seo: {
                    type: Type.OBJECT,
                    properties: { score: { type: Type.NUMBER }, label: { type: Type.STRING } }
                  },
                  bestPractices: {
                    type: Type.OBJECT,
                    properties: { score: { type: Type.NUMBER }, label: { type: Type.STRING } }
                  }
                }
              },
              issues: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING },
                    severity: { type: Type.STRING },
                    description: { type: Type.STRING },
                    recommendation: { type: Type.STRING },
                    businessImpact: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Error:", error);
      throw new Error("Failed to generate AI report. Please check your connection and API key.");
    }
  }
};
