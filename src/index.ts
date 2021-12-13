import TextCortexClient from './textcortex/TextCortexClient';
const TextCortex = (apiKey: string) => new TextCortexClient(apiKey);
export default TextCortex;
