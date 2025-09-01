import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";

export class WebSocketService {
  private wss: WebSocketServer;
  private clients: Map<string, WebSocket>;

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server });
    this.clients = new Map();
    this.initialize();
  }

  private initialize(): void {
    this.wss.on("connection", (ws: WebSocket) => {
      const clientId = this.generateClientId();
      this.clients.set(clientId, ws);

      console.log(`Client connected. Total clients: ${this.clients.size}`);

      ws.on("message", (message: string) => {
        this.handleMessage(clientId, message);
      });

      ws.on("close", () => {
        this.clients.delete(clientId);
        console.log(`Client disconnected. Total clients: ${this.clients.size}`);
      });

      // Send welcome message to the connected client
      ws.send(
        JSON.stringify({
          type: "system",
          message: "Connected to chat server",
          clientId: clientId,
        }),
      );
    });
  }

  private generateClientId(): string {
    return `client-${Math.random().toString(36).substr(2, 9)}`;
  }

  private handleMessage(senderId: string, message: string): void {
    try {
      const parsedMessage = JSON.parse(message.toString());
      const messageToSend = {
        type: "message",
        senderId: senderId,
        content: parsedMessage.content,
        timestamp: new Date().toISOString(),import { Server } from 'socket.io';
        import http from 'http';
      };

      // Broadcast message to all connected clients
      this.broadcast(messageToSend);
    } catch (error) {
      console.error("Error handling message:", error);
      const senderClient = this.clients.get(senderId);
      if (senderClient) {
        senderClient.send(
          JSON.stringify({
            type: "error",
            message: "Invalid message format",
          }),
        );
      }
    }
  }

  public broadcast(message: any): void {
    const messageString = JSON.stringify(message);
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }
    });
  }

  public getConnectedClients(): number {
    return this.clients.size;
  }

  public sendToClient(clientId: string, message: any): void {
    const client = this.clients.get(clientId);
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  }
}
