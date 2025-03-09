import logger from "../../config/logger.js";

const PING_INTERVAL = Number(process.env.PING_INTERVAL) || 30000;

function startHeartbeat(wss) {
  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        logger.info(`Terminating stale connection: ${ws.userId}`);
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping();
    });
  }, PING_INTERVAL);

  wss.on("close", () => {
    clearInterval(interval);
  });
}

export default startHeartbeat;