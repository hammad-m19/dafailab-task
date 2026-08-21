import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatRequestDto } from './dto/chat-request.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: 'Send a message to the AI chatbot' })
  @ApiBody({ type: ChatRequestDto })
  @ApiResponse({ status: 201, description: 'AI response successfully generated.', type: String })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async chat(@Body() chatRequestDto: ChatRequestDto) {
    const aiResponse = await this.chatService.getChatResponse(chatRequestDto.message);
    return { response: aiResponse };
  }
}
