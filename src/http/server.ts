import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { string, z } from 'zod'

const app = fastify()
const PORT = 3000

const prisma = new PrismaClient()

app.post('/polls', async (request, reply) => {
  const createPollBody = z.object({
    title: z.string()
  })

  const { title } = createPollBody.parse(request.body)

  const poll = await prisma.poll.create({
    data: {
      title,
    }
  })

  return reply.status(201).send({ pollId: poll.id })
})

app.get('/', () => {
  return 'Hello World'
})

app.listen({ port: PORT }).then(() => {
  console.log(`HTTP server running in: http://localhost:${PORT}`);
})