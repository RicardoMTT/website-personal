import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  genIA:any;
  model:any;

  constructor() { }


  initialize(key:string, config?:any){
    this.genIA = new GoogleGenerativeAI(key);
    const generationConfig = {
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
      temperature: 0.9,
      top_p: 1,
      top_k: 32,
      maxOutputTokens: 100, // limit output
    };
    let model = config? config : {model: 'gemini-pro',...generationConfig};
    this.model = this.genIA.getGenerativeModel(model);
  }

  async generateText(prompt:string){
    if (!this.model) {
      return;
    }

   try {
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
   } catch (error) {
    console.log(error);
    throw new Error('No se pudo generar el texto');
  }
  }


}
