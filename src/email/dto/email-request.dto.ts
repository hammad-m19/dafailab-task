import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailRequestDto {
  @ApiProperty({ description: 'The recipient email address', example: 'test@example.com' })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ description: 'The subject of the email', example: 'Chatbot Summary' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'The body content of the email', example: 'Here is the summary of your chat...' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
