export interface Message {
    role: 'user' | 'assistant';
    content: string;
}
export interface Session {
    sessionId: string;
    messages: Message[];
}
//# sourceMappingURL=session.d.ts.map