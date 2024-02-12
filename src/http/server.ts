import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { createPoll } from './routes/post-polls'
import { getPoll } from './routes/get-polls'
import { voteOnPoll } from './routes/vote-on-poll'
import cookie from "@fastify/cookie"
import { pollResult } from './ws/poll-result'
import  websocket from '@fastify/websocket'

const app = fastify()
const PORT = 3000

app.register(cookie, {
    secret: "qualquercoisa",
    hook: 'onRequest',
})

app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.register(pollResult)

app.listen({ port: PORT }).then(() => {
  console.log(`HTTP server running in: http://localhost:${PORT}`);
})