
import { Router, Request, Response } from 'express';
import { ChatService } from '../../core/services/chat_service';

const router = Router();
const chatService = new ChatService();

router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({ error: 'sessionId and message are required' });
    }

    const botResponse = await chatService.processMessage(sessionId, message);

    res.json(botResponse);
  } catch (error) {
    console.error('Error processing chat message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
