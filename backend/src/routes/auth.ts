import { FastifyPluginAsync } from 'fastify';
import { hashPassword } from '../utils/auth';

const authRoutes: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post('/login', async (req: any, reply) => {
    const { email, password } = req.body;
    const user = await fastify.prisma.user.findUnique({ where: { email } });
    if (!user) return reply.code(401).send({ error: 'Invalid credentials' });
    // verify
    const argon2 = await import('argon2');
    const ok = await argon2.verify(user.password, password);
    if (!ok) return reply.code(401).send({ error: 'Invalid credentials' });
    const token = fastify.jwt.sign({ userId: user.id, role: user.role }, { expiresIn: process.env.JWT_EXPIRY || '1h' });
    return { token, user: { id: user.id, email: user.email, role: user.role, name: user.name } };
  });

  fastify.get('/me', { preHandler: [fastify.authenticate] }, async (req: any) => {
    const payload: any = req.user;
    const user = await fastify.prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) return fastify.reply.code(404).send({ error: 'User not found' });
    return { id: user.id, email: user.email, role: user.role, name: user.name };
  });
};

export default authRoutes;
