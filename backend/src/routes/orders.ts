import { FastifyPluginAsync } from 'fastify';

const plugin: FastifyPluginAsync = async (f) => {
  f.get('/', { preHandler: [f.auth] }, async (req, reply) => {
    const orders = await f.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    return orders;
  });

  f.get('/:id', { preHandler: [f.auth] }, async (req: any) => {
    const order = await f.prisma.order.findUnique({
      where: { id: req.params.id },
      include: { events: { orderBy: { timestamp: 'desc' } } }
    });
    return order;
  });
};
export default plugin;
