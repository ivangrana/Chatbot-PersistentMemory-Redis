
import redisClient from '../../infrastructure/redis_client';
import { Session, Message } from '../domain/schemas/session';

export class ChatService {
  async getSession(sessionId: string): Promise<Session | null> {
    const sessionData = await redisClient.get(sessionId);
    if (!sessionData) {
      return null;
    }
    return JSON.parse(sessionData) as Session;
  }

  async saveSession(session: Session): Promise<void> {
    await redisClient.set(session.sessionId, JSON.stringify(session));
  }

  async processMessage(sessionId: string, userInput: string): Promise<Message> {
    const session = await this.getSession(sessionId) || { sessionId, messages: [] };

    session.messages.push({ role: 'user', content: userInput });

    // In a real application, you would call an AI model here.
    const botResponse = {
      role: 'assistant' as const,
      content: `Echo: ${userInput}`,
    };

    session.messages.push(botResponse);

    await this.saveSession(session);

    return botResponse;
  }
}
