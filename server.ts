import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root route for Railway health check (matches what you see in browser)
app.get("/", (req, res) => {
  res.send("🚀 AI QA Agent Backend is Running");
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend API is operational" });
});

// The main QA generation route
app.post("/generate", async (req, res) => {
  const { url, type } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, error: "URL is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, error: "Gemini API key is not configured on the server" });
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
    res.status(500).json({ success: false, error: "Failed to generate report. Check server logs." });
  }
});

// Serve static files in production (optional for Railway if you only use it for API)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
