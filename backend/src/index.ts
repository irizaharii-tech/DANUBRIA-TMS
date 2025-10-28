import Fastify from 'fastify';
import dotenv from 'dotenv';
import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import orderRoutes from './routes/orders';
import publicRoutes from './routes/public';

dotenv.config();
const prisma = new PrismaClient();
const server = Fastify({ logger: true });

server.register(cors, { origin: process.env.FRONTEND_URL || true });
server.register(rateLimit, { max: 200, timeWindow: '1 minute' });

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'dev_jwt_secret',
  cookie: { cookieName: 'token' }
});

// decorate prisma
server.decorate('prisma', prisma);

// auth plugin
server.register(authRoutes, { prefix: '/api/auth' });
server.register(orderRoutes, { prefix: '/api' });
server.register(publicRoutes, { prefix: '/api/public' });

const start = async () => {
  try {
    const port = Number(process.env.PORT || 4000);
    await server.listen({ port, host: '0.0.0.0' });
    server.log.info(`Server listening on ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
