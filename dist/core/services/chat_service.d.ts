import { Session, Message } from '../domain/schemas/session';
export declare class ChatService {
    getSession(sessionId: string): Promise<Session | null>;
    saveSession(session: Session): Promise<void>;
    processMessage(sessionId: string, userInput: string): Promise<Message>;
}
//# sourceMappingURL=chat_service.d.ts.map