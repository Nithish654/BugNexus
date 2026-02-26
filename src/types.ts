export type WebsiteType = 
  | 'portfolio' 
  | 'business' 
  | 'ecommerce' 
  | 'blog' 
  | 'educational' 
  | 'news' 
  | 'saas';

export interface Issue {
  type: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  recommendation: string;
  businessImpact: string;
}

export interface LighthouseScore {
  score: number;
  label: 'Poor' | 'Good' | 'Excellent';
}

export interface GenerateResponse {
  success: boolean;
  message: string;
  report: string;
  error?: string;
  executiveSummary?: {
    overallScore: number;
    healthGrade: string;
    riskLevel: 'High' | 'Medium' | 'Low';
    auditDate: string;
    issueBreakdown: {
      high: number;
      medium: number;
      low: number;
    };
  };
  lighthouseScores?: {
    performance: LighthouseScore;
    accessibility: LighthouseScore;
    seo: LighthouseScore;
    bestPractices: LighthouseScore;
  };
  issues?: Issue[];
  automationData?: {
    title: string;
    metaDescription: string;
    linkCount: number;
    formsCount: number;
    buttonCount: number;
    consoleErrors: number;
    brokenLinks: number;
  };
}

export interface HistoryItem {
  id: string;
  url: string;
  type: WebsiteType;
  date: string;
  overallScore: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  response: GenerateResponse;
}
