import { Injectable } from '@nestjs/common';
import { historyManager } from './model/history-manager';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { answerRecetteInputDTO } from './model/answer-recette-search.dto';
import { answerRecetteOutputDTO } from './model/answer-recette-search.dto';
import * as dotenv from 'dotenv';

dotenv.config();

const DEFAULT_TEMPERATURE = 1;
const DEFAULT_MODEL = 'gpt-3.5-turbo';

@Injectable()
export class RecetteSearchService {
  private readonly history: historyManager;
  private readonly chat: ChatOpenAI;
  constructor() {
    this.history = new historyManager();
    this.chat = new ChatOpenAI({
      temperature: DEFAULT_TEMPERATURE,
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: DEFAULT_MODEL,
    });
  }
  async getAiModelAnswer(data: answerRecetteInputDTO) {
    this.history.addHumanMessage(data.message);
    const result = await this.chat.predictMessages(this.history.history);

    const aiMessage = result.content;

    this.history.addAIMessage(aiMessage);
    return answerRecetteOutputDTO.getInstance(aiMessage);
  }
  async getRecetteSearchAnswer(data: answerRecetteInputDTO) {
    return this.getAiModelAnswer(data);
  }
}
