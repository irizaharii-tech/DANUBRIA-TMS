import { FastifyPluginAsync } from 'fastify';
import argon2 from 'argon2';

const plugin: FastifyPluginAsync = async (f) => {
  f.post('/login', async (req: any, reply) => {
    const { email, password } = req.body;
    const user = await f.prisma.user.findUnique({ where: { email } });
    if (!user || !(await argon2.verify(user.password, password))) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }
    const token = f.jwt.sign({ id: user.id, role: user.role, name: user.name }, { expiresIn: '8h' });
    return { token, user: { id: user.id, email: user.email, role: user.role, name: user.name } };
  });

  f.get('/me', { preHandler: [f.auth] }, async (req: any) => {
    const me = await f.prisma.user.findUnique({ where: { id: (req.user as any).id } });
    return { id: me?.id, email: me?.email, role: me?.role, name: me?.name };
  });
};
export default plugin;
