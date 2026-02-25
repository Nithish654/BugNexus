import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.post("/api/generate", async (req, res) => {
  const { url, type } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, error: "URL is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, error: "Gemini API key is not configured" });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a comprehensive production-ready QA analysis for a ${type || 'general'} website: ${url}. 
      
      Context-specific testing requirements for ${type}:
      ${type === 'ecommerce' ? '- Check shopping cart functionality, product search, and checkout flow.' : ''}
      ${type === 'portfolio' ? '- Check project gallery, resume download, and contact links.' : ''}
      ${type === 'blog' ? '- Check article navigation, comment sections, and social sharing.' : ''}
      ${type === 'business' ? '- Check service listings, about page, and lead generation forms.' : ''}
      ${type === 'educational' ? '- Check course listings, student portal links, and resource downloads.' : ''}
      ${type === 'news' ? '- Check breaking news sections, category filters, and dynamic updates.' : ''}
      ${type === 'saas' ? '- Check landing page conversion elements, feature highlights, pricing tables, and login/signup flows.' : ''}

      Provide a detailed, professional QA report in Markdown format. 
      Include sections for:
      - Executive Summary
      - Functional Testing Results
      - User Interface & Experience (UI/UX) Analysis
      - Link & Navigation Integrity
      - Form & Input Validation
      - Performance & Accessibility Observations
      - Actionable Recommendations
      
      Use emojis and clear headings to make it readable.`,
    });

    const reportText = response.text || "No report generated.";
    
    res.json({
      success: true,
      message: "QA Report Generated Successfully",
      report: reportText
    });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ success: false, error: "Failed to generate report" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "🚀 AI QA Agent Backend is Running" });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
