"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const redis_client_1 = __importDefault(require("../../infrastructure/redis_client"));
class ChatService {
    async getSession(sessionId) {
        const sessionData = await redis_client_1.default.get(sessionId);
        if (!sessionData) {
            return null;
        }
        return JSON.parse(sessionData);
    }
    async saveSession(session) {
        await redis_client_1.default.set(session.sessionId, JSON.stringify(session));
    }
    async processMessage(sessionId, userInput) {
        const session = await this.getSession(sessionId) || { sessionId, messages: [] };
        session.messages.push({ role: 'user', content: userInput });
        // In a real application, you would call an AI model here.
        const botResponse = {
            role: 'assistant',
            content: `Echo: ${userInput}`,
        };
        session.messages.push(botResponse);
        await this.saveSession(session);
        return botResponse;
    }
}
exports.ChatService = ChatService;
//# sourceMappingURL=chat_service.js.map