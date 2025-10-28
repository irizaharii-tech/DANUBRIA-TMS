import { FastifyInstance } from 'fastify';
import argon2 from 'argon2';

export const verifyPassword = async (hash: string, plain: string) => {
  return argon2.verify(hash, plain);
};

export const hashPassword = async (plain: string) => {
  return argon2.hash(plain);
};

export function authGuard(instance: FastifyInstance) {
  instance.decorate('authenticate', async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized' });
    }
  });
}
