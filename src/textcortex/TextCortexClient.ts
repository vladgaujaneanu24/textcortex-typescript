import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  GenerateEmailBodyParams,
  GenerateEmailSubjectParams,
  GenerateProductDescriptionsParams,
} from '../types/textcortex.types';
import {
  GenerateParams,
  TextCortexCategories,
  HemingwAIAPIParams,
  GenerateBlogParams,
} from '../types/textcortex.types';
import { arrayToString } from '../utils';
import { HemingwAIAPIResponse } from '../types/textcortex.types';

export default class TextCortexClient {
  private apiKey: string;
  private host: string;
  private headers: { [key: string]: string };

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'text/plain',
      'user-agent': 'typescript-hemingwAI',
    };
    this.host = 'https://api.textcortex.com/hemingwai';
  }

  private buildParams(category: TextCortexCategories, params: HemingwAIAPIParams) {
    return { ...params, category, apiKey: this.apiKey };
  }

  private handleErrorCodes(error: AxiosError) {
    switch (error?.response?.status) {
      case 403:
        throw new Error('API Key is invalid. Check out your API key on https://app.textcortex.com/user/account');
      case 402:
        throw new Error(
          'Reached API Limits, increase limits by contacting us at dev@textcortex.com or upgrade your account',
        );
      case 500:
      default:
        throw new Error(`An Error occured! ${error.message}`);
    }
  }

  private async callHemingwAIAPI(
    category: TextCortexCategories,
    params: HemingwAIAPIParams,
  ): Promise<HemingwAIAPIResponse | undefined> {
    const url = `${this.host}/generate_text`;
    try {
      const response: AxiosResponse<HemingwAIAPIResponse> = await axios.post(url, this.buildParams(category, params), {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      this.handleErrorCodes(error as AxiosError);
    }
  }

  public generate({ prompt, parameters, character_count, source_language, creativity, n_gen = 1 }: GenerateParams) {
    return this.callHemingwAIAPI(TextCortexCategories.AUTO, {
      prompt,
      parameters,
      character_count,
      source_language,
      creativity,
      n_gen,
    });
  }

  public generateBlog({
    blog_title,
    character_count,
    creativity,
    source_language,
    n_gen = 1,
    blog_categories,
  }: GenerateBlogParams) {
    return this.callHemingwAIAPI(TextCortexCategories.BLOG, {
      prompt: blog_title,
      parameters: blog_categories ? `Blog Categories: [${arrayToString(blog_categories)}]` : '',
      character_count,
      source_language,
      creativity,
      n_gen,
    });
  }

  public generateAds({ prompt, parameters, character_count, source_language, creativity, n_gen = 1 }: GenerateParams) {
    return this.callHemingwAIAPI(TextCortexCategories.ADS, {
      prompt,
      parameters,
      character_count,
      source_language,
      creativity,
      n_gen,
    });
  }

  public generateEmailBody({
    email_subject,
    parameters,
    character_count,
    creativity,
    source_language,
    n_gen = 1,
  }: GenerateEmailBodyParams) {
    return this.callHemingwAIAPI(TextCortexCategories.EMAIL_BODY, {
      prompt: email_subject,
      parameters,
      character_count,
      creativity,
      source_language,
      n_gen,
    });
  }

  public generateEmailSubject({
    keywords,
    parameters,
    character_count,
    creativity,
    source_language,
    n_gen = 1,
  }: GenerateEmailSubjectParams) {
    return this.callHemingwAIAPI(TextCortexCategories.EMAIL_SUBJECT, {
      prompt: keywords,
      parameters,
      character_count,
      creativity,
      source_language,
      n_gen,
    });
  }

  public generateProductDescriptions({
    product_title,
    product_brand = '',
    product_category = [],
    product_features = [],
    character_count = 256,
    creativity = 0.65,
    source_language = 'en',
    n_gen = 1,
  }: GenerateProductDescriptionsParams) {
    const parameters: string[] = [];
    if (product_brand) {
      parameters.push(`Brand: '${product_brand}'`);
    }
    if (product_category.length > 0) {
      parameters.push(`Category: [${arrayToString(product_category)}]`);
    }
    if (product_features.length > 0) {
      parameters.push(`Features: [${arrayToString(product_features)}]`);
    }
    const parametersString = parameters.join(' ');
    return this.callHemingwAIAPI(TextCortexCategories.PRODUCT_DESCRIPTION, {
      prompt: product_title,
      parameters: parametersString,
      character_count,
      source_language,
      creativity,
      n_gen,
    });
  }
}
