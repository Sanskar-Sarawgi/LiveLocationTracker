import { addChannel, addSubscriber } from "../services/pub-sub.js";

export const handleUpgradeRequest = async (action, data) => {

   switch (action) {
     case "/public-location":
        return await addChannel(data.pubSub, data.userId)
     case "/subscribe-location":
        return await addSubscriber(data.pubSub, data.userId)
     default:
   }
}