import {SentimentAnalyzer,PorterStemmer,WordTokenizer} from 'natural';
import { fetchData } from '../webScraper/scraper/utils/fetcher';
 
const tokenizer = new WordTokenizer();
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

export const getSentimentFromText=(text:string):number=>{

return analyzer.getSentiment(tokenizer.tokenize(text));
}
const getLabels =async (text:string)=>{
const token = tokenizer.tokenize(text)
for (let word of token){
    try {
        const res = await fetchData(`https://wordsapiv1.p.mashape.com/words/${word}`,false)
        console.log(res)
    } catch (error) {
        
    }
}
}