  import {
    HumanMessage,
    AIMessage,
    SystemMessage,
    BaseMessage,
  } from 'langchain/schema';

  export class historyManager {
    readonly history: BaseMessage[];

    constructor(systemMessage?: string) {
      this.history = [];

      if (systemMessage) {
        this.addSystemMessage(systemMessage);
      }
    }
    private addSystemMessage(message: string) {
      this.history.push(new SystemMessage(message));
    }
    addAIMessage(message: string) {
      this.history.push(new AIMessage(message));
    }
    addHumanMessage(message: string) {
      this.history.push(new HumanMessage(message));
    }
  }
