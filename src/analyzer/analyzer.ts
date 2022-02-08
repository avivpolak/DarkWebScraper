import {SentimentAnalyzer,PorterStemmer,WordTokenizer} from 'natural';
 
const tokenizer = new WordTokenizer();
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

export const sentimentor=(text:string):number=>{
return analyzer.getSentiment(tokenizer.tokenize(text));
}
