import { WebSocketServer } from "ws";
import "./config/load-env.js";
import { handleRequestData } from "./src/handlers/index.js";
import { createServer } from "https";
import logger from "./config/logger.js";
import { isValidUser } from "./src/services/user.js";
import { handleUpgradeRequest } from "./src/handlers/upgrade.js";
import startHeartbeat from "./src/utils/ws-helper.js";
import fs from "fs"
import { httpRequestHandler } from "./src/handlers/http-request.js";

const clients = new Map();
const pubSub = new Map();

var options = {
  key: fs.readFileSync('./private-key.pem'),
  cert: fs.readFileSync('./certificate.pem'),
};

const server = createServer(options, httpRequestHandler);

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

    logger.info(`Client connected with UUID: ${userId}`);
    await handleUpgradeRequest(action, data)

    wss.emit("connection", ws, request);
  });
});

startHeartbeat(wss)

// Handle WebSocket connections
wss.on("connection", (ws, request) => {

  // Setup ping/pong
  ws.isAlive = true;
  
  ws.on("pong", function ()  {this.isAlive = true;});

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
      ws.send(JSON.stringify({ 
        error: true, 
        message: "Failed to process message" 
      }));
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
