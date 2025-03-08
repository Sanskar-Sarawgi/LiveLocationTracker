import { logRequest } from "../utils/logger.js";
import { parseJsonData } from "../utils/string-manipulation.js";
import { handleLocationRequests } from "./location.js";

export const handleRequestData = async (requestData, pubSub, clients, ws) => {
    const requestDataJson = parseJsonData(requestData);
    // logRequest(requestDataJson);

    switch (requestDataJson.type) {
      case "send-location":
        return await handleLocationRequests(requestDataJson, pubSub, clients, ws);
      default:
    }
  };