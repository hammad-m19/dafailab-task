import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.resend = new Resend(apiKey);
  }

  async sendEmail(to: string, subject: string, content: string) {
    try {
      const data = await this.resend.emails.send({
        from: 'Chatbot App <onboarding@resend.dev>',
        to: [to],
        subject: subject,
        text: content,
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException('Failed to send email: ' + error.message);
    }
  }
}
