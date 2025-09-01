import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import chatRoutes from "./infrastructure/routes/chat_routes";
import { WebSocketService } from "./infrastructure/websocket/websocket_service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Create HTTP server
const server = createServer(app);

// Initialize WebSocket service
const wsService = new WebSocketService(server);

app.use(express.json());
app.use("/api", chatRoutes);

// Store WebSocket service in app locals for access in routes
app.locals.wsService = wsService;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server with WebSocket Support");
});

// Use server.listen instead of app.listen
server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`[websocket]: WebSocket server is running`);
});

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});
