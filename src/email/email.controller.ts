import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailRequestDto } from './dto/email-request.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send an email notification or summary' })
  @ApiBody({ type: EmailRequestDto })
  @ApiResponse({ status: 201, description: 'Email successfully sent.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async sendEmail(@Body() emailRequestDto: EmailRequestDto) {
    const result = await this.emailService.sendEmail(
      emailRequestDto.to,
      emailRequestDto.subject,
      emailRequestDto.content,
    );
    return { success: true, data: result };
  }
}
