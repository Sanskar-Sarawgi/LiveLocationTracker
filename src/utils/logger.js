import logger from "../../config/logger.js";

export function logRequest(requestData) {
  logger.info(`Request action /${requestData.type}/${requestData.action}`);
  logger.info(`Request data ${JSON.stringify(requestData)}`);
}