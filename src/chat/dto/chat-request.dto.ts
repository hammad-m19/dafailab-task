import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatRequestDto {
  @ApiProperty({ description: 'The message to send to the AI', example: 'Hello, how are you?' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
