import { WebSocketServer } from "ws";
import "./config/load-env.js";
import { handleRequestData } from "./src/handlers/index.js";
import { createServer } from "http";
import logger from "./config/logger.js";
import { v4 as uuidv4 } from "uuid"; // Use UUID for unique socket IDs
import { allChild, isValidUser } from "./src/services/user.js";
import { handleUpgradeRequest } from "./src/handlers/upgrade.js";

const server = createServer((req, res) => {
  if (req.url === "/ws_health_check") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
    return;
  }
});

const clients = new Map();
const pubSub = new Map();
const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", async (request, socket, head) => {
  logger.info("Connection upgrade request received.");
  const url = new URL(request.url, `http://${request.headers.host}`);
  const userId = url.searchParams.get("userId");
  const action = url.pathname

  if(! await isValidUser(userId)){
    logger.error('Connection terminated');
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }

  wss.handleUpgrade(request, socket, head, async (ws) => {
    ws.userId = userId;
    clients.set(userId, ws);
    const data = {
      userId,
      pubSub
    }

    logger.info(`Client connected with Socket ID: ${userId}`);
    await handleUpgradeRequest(action, data)
    console.log(pubSub)

    wss.emit("connection", ws, request);
  });
});

// Handle WebSocket connections
wss.on("connection", (ws, request) => {
  ws.on("error", (error) => {
    logger.error("WebSocket error:", error);
  });

  ws.on("message", async (msg) => {
    try {
      const message = msg.toString();
      if (message === "ping" || message === '"ping"') {
        logger.info("Received ping, sending pong.");
        ws.send("pong");
      } else {
        const response = await handleRequestData(message, pubSub, clients, ws);
        if (response) ws.send(JSON.stringify(response));
      }
    } catch (err) {
      logger.info("Error processing message:", err);
    }
  });

  ws.on("close", (code, reason) => {
    logger.info(`WebSocket closed: ${ws.userId}, Reason: ${reason}`);
    clients.delete(ws.userId);
  });

  ws.send("Welcome to WebSocket server!");
});

server.listen(process.env.WEBSOCKET_PORT, () => {
  logger.info(`WebSocket server running on port ${process.env.WEBSOCKET_PORT}`);
});
