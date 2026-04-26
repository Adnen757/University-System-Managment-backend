import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  async askQuestion(@Body() body: { question: string }, @Res() response) {
    try {
      const { question } = body;
      
      if (!question) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'La question est requise'
        });
      }

      const answer = await this.chatbotService.askAI(question);
      
      return response.status(HttpStatus.OK).json({
        message: 'Réponse générée avec succès',
        question,
        answer
      });
    } catch (error) {
      console.error('Erreur chatbot:', error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: 'Erreur lors du traitement de la question: ' + error.message
      });
    }
  }

  @Post('professeur')
  async askProfesseur(@Body() body: { question: string }, @Res() response) {
    try {
      const { question } = body;
      
      if (!question) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'La question est requise'
        });
      }

      const answer = await this.chatbotService.askAIProfesseur(question);
      
      return response.status(HttpStatus.OK).json({
        message: 'Réponse générée avec succès',
        question,
        answer
      });
    } catch (error) {
      console.error('Erreur chatbot professeur:', error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: 'Erreur lors du traitement de la question: ' + error.message
      });
    }
  }
}
