import { FastifyPluginAsync } from 'fastify';

const plugin: FastifyPluginAsync = async (f) => {
  f.get('/', { preHandler: [f.auth] }, async () => {
    const [activeCount, deliveredCount, inTransitCount] = await Promise.all([
      f.prisma.order.count({ where: { status: { in: ['PLANNED', 'ASSIGNED', 'LOADING', 'LOADED', 'IN_TRANSIT'] } } }),
      f.prisma.order.count({ where: { status: 'DELIVERED' } }),
      f.prisma.order.count({ where: { status: 'IN_TRANSIT' } })
    ]);

    // Very simple demo KPIs
    const revenue30d = await f.prisma.order.aggregate({
      _sum: { price: true },
      where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 3600 * 1000) } }
    });

    // Recent activity (events)
    const activity = await f.prisma.orderEvent.findMany({
      orderBy: { timestamp: 'desc' },
      take: 8,
      include: { order: true }
    });

    return {
      cards: {
        activeOrders: activeCount,
        revenue30d: revenue30d._sum.price || 0,
        vehiclesActive: 14, // demo metric
        avgMargin: 18.5     // demo metric
      },
      activity: activity.map(a => ({
        id: a.id,
        orderNumber: a.order.orderNumber,
        eventType: a.eventType,
        timestamp: a.timestamp
      }))
    };
  });
};
export default plugin;
