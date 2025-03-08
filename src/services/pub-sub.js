import logger from "../../config/logger.js"
import { allChild, isValidChild, isValidParent } from "./user.js"

export const addChannel = async (pubSub, userId) => {
    if(! await isValidChild(userId)) return false

    pubSub.set(userId, [])
    logger.info('New Child (' + userId + ') Channel Added')
}

export const addSubscriber = async (pubSub, userId) => {
    if(! await isValidParent(userId)) return false
    const k = await allChild(userId)
    k.forEach((child_uuid) => {
        let sub_list = pubSub.get(child_uuid)
        if(sub_list != undefined){
            sub_list.push(userId)
            pubSub.set(child_uuid, sub_list)
            logger.info('Parent Sub to (' + child_uuid + ') Channel')
        }
    })
}