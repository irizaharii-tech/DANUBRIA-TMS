import { FastifyPluginAsync } from 'fastify';
import crypto from 'crypto';

const publicRoutes: FastifyPluginAsync = async (fastify, opts) => {
  // Verify signed token and perform single action (stateless signature + optional DB stored hash)
  fastify.post('/update', async (req: any, reply) => {
    /**
     * Body: { token: string, payload?: { ... } }
     * Token = base64url(payloadJSON) + '.' + hex(hmac)
     */
    const { token } = req.body;
    if (!token) return reply.code(400).send({ error: 'token required' });

    try {
      const [payloadB64, sig] = token.split('.');
      const payloadJson = Buffer.from(payloadB64, 'base64url').toString('utf8');
      const payload = JSON.parse(payloadJson);
      const hmac = crypto.createHmac('sha256', process.env.HMAC_SECRET || 'dev_hmac');
      hmac.update(payloadB64);
      const expected = hmac.digest('hex');

      if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) {
        return reply.code(401).send({ error: 'Invalid token signature' });
      }
      const now = Date.now();
      if (now > new Date(payload.expiresAt).getTime()) {
        return reply.code(410).send({ error: 'Token expired' });
      }

      // apply action
      const { orderId, action, actorType, actorId, details } = payload;
      if (!orderId || !action) return reply.code(400).send({ error: 'malformed token' });

      if (action === 'confirm_loaded') {
        await fastify.prisma.order.update({ where: { id: orderId }, data: { status: 'LOADED' } });
        await fastify.prisma.orderEvent.create({ data: { orderId, actorType: actorType || 'carrier', actorId: actorId || null, eventType: 'LOADED', details } });
        return { ok: true, msg: 'Order marked as LOADED' };
      }

      if (action === 'update_eta') {
        const { etaLoad, etaDelivery } = payload;
        await fastify.prisma.order.update({ where: { id: orderId }, data: { etaLoad: etaLoad ? new Date(etaLoad) : undefined, etaDelivery: etaDelivery ? new Date(etaDelivery) : undefined } });
        await fastify.prisma.orderEvent.create({ data: { orderId, actorType: actorType || 'carrier', actorId: actorId || null, eventType: 'ETA_UPDATED', details } });
        return { ok: true, msg: 'ETA updated' };
      }

      if (action === 'confirm_delivered') {
        await fastify.prisma.order.update({ where: { id: orderId }, data: { status: 'DELIVERED' } });
        await fastify.prisma.orderEvent.create({ data: { orderId, actorType: actorType || 'carrier', actorId: actorId || null, eventType: 'DELIVERED', details } });
        return { ok: true, msg: 'Order marked as DELIVERED' };
      }

      return reply.code(400).send({ error: 'unknown action' });

    } catch (err) {
      req.log.error(err);
      return reply.code(500).send({ error: 'invalid token' });
    }
  });
};

export default publicRoutes;
