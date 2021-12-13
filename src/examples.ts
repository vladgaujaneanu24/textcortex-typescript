import TextCortex from '.';

// Create the hemingwai object and enter your API Key
const hemingwai = TextCortex('YOUR_API_KEY');

// Generate Blog articles using Hemingwai
hemingwai
  .generateBlog({
    blog_title: 'Why SEO is important for your Business?',
    blog_categories: ['SEO', 'Business'],
    source_language: 'en',
    character_count: 400,
    creativity: 0.7,
    n_gen: 2,
  })
  .then(console.log);

// Generate Product Descriptions using Hemingwai
hemingwai
  .generateProductDescriptions({
    product_title: 'Black Backpack Bag',
    product_category: ['Shoes & Bags', 'Women'],
    product_brand: 'Cortexian',
    product_features: ['Color: Black', 'Material: Faux Leather'],
    source_language: 'en',
    character_count: 400,
    creativity: 0.6,
    n_gen: 3,
  })
  .then(console.log);

// Autocomplete the rest using Hemingwai
hemingwai
  .generate({
    prompt: 'Was ist los mit dir?',
    parameters: '',
    source_language: 'de',
    character_count: 200,
    creativity: 0.7,
  })
  .then(console.log);

// Generate Ad copies using Hemingwai
hemingwai
  .generateAds({
    prompt: 'Pink Geometric Bag',
    parameters: 'Young Women',
    source_language: 'en',
    character_count: 200,
    creativity: 0.7,
  })
  .then(console.log);

// Generate Email Body using Hemingwai
hemingwai
  .generateEmailBody({
    email_subject: 'Summer Sale on Selected Sunglasses!',
    parameters: '',
    source_language: 'en',
    character_count: 200,
    creativity: 0.7,
  })
  .then(console.log);

// Generate Email Subject using Hemingwai
hemingwai.generateEmailSubject({
  keywords: 'Sunglasses, summer, sale',
  parameters: 'Young people',
  source_language: 'en',
  character_count: 100,
  creativity: 0.7,
});
