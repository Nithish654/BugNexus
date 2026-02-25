export type WebsiteType = 
  | 'portfolio' 
  | 'business' 
  | 'ecommerce' 
  | 'blog' 
  | 'educational' 
  | 'news' 
  | 'saas';

export interface GenerateResponse {
  success: boolean;
  message: string;
  report: string;
  error?: string;
}
