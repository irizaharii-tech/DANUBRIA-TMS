import { FastifyPluginAsync } from 'fastify';

const ordersRoutes: FastifyPluginAsync = async (fastify, opts) => {
  // Get orders (simple, paginated)
  fastify.get('/orders', { preHandler: [fastify.authenticate] }, async (req: any, reply) => {
    const orders = await fastify.prisma.order.findMany({ take: 100, orderBy: { createdAt: 'desc' } });
    return orders;
  });

  fastify.get('/orders/:id', { preHandler: [fastify.authenticate] }, async (req: any) => {
    const { id } = req.params as any;
    const order = await fastify.prisma.order.findUnique({ where: { id }, include: { events: true } });
    return order;
  });

  fastify.post('/orders', { preHandler: [fastify.authenticate] }, async (req: any) => {
    const data = req.body;
    const created = await fastify.prisma.order.create({ data });
    return created;
  });

  fastify.put('/orders/:id', { preHandler: [fastify.authenticate] }, async (req: any) => {
    const { id } = req.params as any;
    const update = req.body;
    const updated = await fastify.prisma.order.update({ where: { id }, data: update });
    return updated;
  });

  fastify.post('/orders/:id/status', { preHandler: [fastify.authenticate] }, async (req: any) => {
    const { id } = req.params as any;
    const { status, actorType, actorId, details } = req.body;
    const updated = await fastify.prisma.order.update({ where: { id }, data: { status } });
    await fastify.prisma.orderEvent.create({
      data: { orderId: id, actorType, actorId, eventType: status, details: details || {} }
    });
    return updated;
  });
};

export default ordersRoutes;
