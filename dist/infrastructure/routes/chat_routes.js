"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_service_1 = require("../../core/services/chat_service");
const router = (0, express_1.Router)();
const chatService = new chat_service_1.ChatService();
router.post('/chat', async (req, res) => {
    try {
        const { sessionId, message } = req.body;
        if (!sessionId || !message) {
            return res.status(400).json({ error: 'sessionId and message are required' });
        }
        const botResponse = await chatService.processMessage(sessionId, message);
        res.json(botResponse);
    }
    catch (error) {
        console.error('Error processing chat message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=chat_routes.js.map