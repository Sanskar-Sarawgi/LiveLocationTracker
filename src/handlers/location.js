export const handleLocationRequests = (req, pubSub, clients, ws) => {
    console.log(req)
    const sender_list = pubSub.get(ws.userId)
    sender_list.forEach(sender => {
        clients.get(sender).send(req.location)
    });
}