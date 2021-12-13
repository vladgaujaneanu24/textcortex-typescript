export type HemingwAIAPIParams = {
  prompt: string;
  character_count: number;
  source_language: string;
  creativity: number;
  n_gen: number;
  parameters: any;
};

export type HemingwAIAPIResponse = {
  status: string;
  error: number;
  ai_results: {
    generated_text: string;
    rank: number;
    text_length: number;
    word_frequency: {
      word: string;
      frequency: number;
    }[];
    word_count: number;
  }[];
};

export type GenerateParams = {
  prompt: string;
  parameters: any;
  character_count: number;
  source_language: string;
  creativity: number;
  n_gen?: number;
};

export type GenerateBlogParams = {
  blog_title: string;
  character_count: number;
  creativity: number;
  source_language: string;
  n_gen?: number;
  blog_categories: string[];
};

export type GenerateEmailBodyParams = {
  email_subject: string;
  parameters: any;
  character_count: number;
  source_language: string;
  creativity: number;
  n_gen?: number;
};

export type GenerateEmailSubjectParams = {
  keywords: string;
  parameters: any;
  character_count: number;
  source_language: string;
  creativity: number;
  n_gen?: number;
};

export type GenerateProductDescriptionsParams = {
  product_title: string;
  product_brand?: string;
  product_category?: string[];
  product_features?: string[];
  character_count?: number;
  creativity?: number;
  source_language?: string;
  n_gen?: number;
};

export enum TextCortexCategories {
  AUTO = 'Auto Complete',
  BLOG = 'Blog Body',
  ADS = 'Ads',
  EMAIL_BODY = 'Email Body',
  EMAIL_SUBJECT = 'Email Subject',
  PRODUCT_DESCRIPTION = 'Product Description',
}
