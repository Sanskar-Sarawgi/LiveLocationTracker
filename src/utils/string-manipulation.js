import logger from "../../config/logger.js";

export const parseJsonData = (requestData) => {
    try {
      return JSON.parse(requestData);
    } catch (error) {
      logger.log("error", "parseJsonData Failed - " + error);
      return {};
    }
};