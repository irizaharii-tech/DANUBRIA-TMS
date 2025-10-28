import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = Fastify({ logger: true });
const prisma = new PrismaClient();

app.register(cors, { origin: process.env.FRONTEND_URL || true });
app.register(jwt, { secret: process.env.JWT_SECRET || 'dev' });

app.decorate('prisma', prisma);
app.decorate('auth', async (req: any, reply: any) => {
  try { await req.jwtVerify(); } catch { return reply.code(401).send({ error: 'Unauthorized' }); }
});

// routes
app.register(require('./routes/auth').default, { prefix: '/api/auth' });
app.register(require('./routes/orders').default, { prefix: '/api/orders' });
app.register(require('./routes/metrics').default, { prefix: '/api/metrics' });

const port = Number(process.env.PORT || 4000);
app.listen({ port, host: '0.0.0.0' }).catch((e) => {
  app.log.error(e);
  process.exit(1);
});

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    auth: any;
  }
}
