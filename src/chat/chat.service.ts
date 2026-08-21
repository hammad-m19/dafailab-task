import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class ChatService {
  private ai: GoogleGenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    this.ai = new GoogleGenAI({ apiKey });
  }

  async getChatResponse(message: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: message,
      });
      return response.text || '';
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate AI response: ' + error.message);
    }
  }
}
