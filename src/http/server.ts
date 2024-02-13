import cookie from "@fastify/cookie";
import websocket from "@fastify/websocket";
import fastify from "fastify";

import { getPoll } from "./routes/get-polls";
import { createPoll } from "./routes/post-polls";
import { voteOnPoll } from "./routes/vote-on-poll";
import { pollResult } from "./ws/poll-result";

const app = fastify();
const PORT = 3000;
const { SECRET_WORD } = process.env;

app.register(cookie, {
  secret: SECRET_WORD,
  hook: "onRequest",
});

app.register(websocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);

app.register(pollResult);

app.listen({ port: PORT }).then(() => {
  console.log(`HTTP server running in: http://localhost:${PORT}`);
});
