import url from "url"
import { allChild, getIdFromEmail } from "../services/user.js"

export const httpRequestHandler = async (req, res) => {

  // Allow all origins
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (/^\/get_id\?email=.*$/.test(req.url)) {
    const parsedUrl = url.parse(req.url, true);
    const email = parsedUrl.query.email;

    if (!email) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Missing email parameter");
      return;
    }

    const uuid = await getIdFromEmail(email);

    if (!uuid) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("UUID not found");
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ uuid }));
    return;
  }

  if (/^\/get_child_id\?email=.*$/.test(req.url)) {
    const parsedUrl = url.parse(req.url, true);
    const email = parsedUrl.query.email;

    if (!email) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Missing email parameter");
      return;
    }

    const uuid = await getIdFromEmail(email);

    if (!uuid) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("UUID not found");
      return;
    }

    const child_uuid_list = await allChild(uuid)

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ uuids: child_uuid_list }));
    return;
  }

  if (req.url === "/ws_health_check") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
    return;
  }
}