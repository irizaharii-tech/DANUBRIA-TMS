import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'argon2';
const prisma = new PrismaClient();

async function main() {
  // Users
  const [mp, dp, ap] = await Promise.all([
    hash('ManagerPassword123!'),
    hash('DispatcherPassword123!'),
    hash('AccountingPassword123!')
  ]);

  await prisma.user.upsert({
    where: { email: 'manager@example.com' },
    update: {},
    create: { email: 'manager@example.com', password: mp, role: Role.MANAGER, name: 'Admin User' }
  });
  await prisma.user.upsert({
    where: { email: 'dispatcher@example.com' },
    update: {},
    create: { email: 'dispatcher@example.com', password: dp, role: Role.DISPATCHER, name: 'John D.' }
  });
  await prisma.user.upsert({
    where: { email: 'accounting@example.com' },
    update: {},
    create: { email: 'accounting@example.com', password: ap, role: Role.ACCOUNTING, name: 'Sarah M.' }
  });

  const acme = await prisma.customer.upsert({
    where: { name: 'ACME Corp' },
    update: {},
    create: { name: 'ACME Corp', email: 'ops@acme.example' }
  });
  const global = await prisma.customer.upsert({
    where: { name: 'Global Trading' },
    update: {},
    create: { name: 'Global Trading', email: 'logistics@global.example' }
  });

  const carrier = await prisma.carrier.upsert({
    where: { name: 'BlueTransport' },
    update: {},
    create: { name: 'BlueTransport', email: 'dispatch@blue.example' }
  });

  const now = Date.now();
  const orders = await prisma.$transaction([
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2023-156',
        customerId: acme.id,
        carrierId: carrier.id,
        origin: 'Berlin',
        destination: 'Paris',
        status: 'DELIVERED',
        price: 1450,
        etaLoad: new Date(now - 5 * 24 * 3600 * 1000),
        etaDelivery: new Date(now - 4 * 24 * 3600 * 1000)
      }
    }),
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2023-157',
        customerId: global.id,
        carrierId: carrier.id,
        origin: 'Warsaw',
        destination: 'Prague',
        status: 'IN_TRANSIT',
        price: 980,
        etaLoad: new Date(now - 1 * 24 * 3600 * 1000),
        etaDelivery: new Date(now + 1 * 24 * 3600 * 1000)
      }
    }),
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2023-158',
        customerId: acme.id,
        carrierId: carrier.id,
        origin: 'Hamburg',
        destination: 'Vienna',
        status: 'PLANNED',
        price: 750,
        etaLoad: new Date(now + 6 * 3600 * 1000),
        etaDelivery: new Date(now + 2 * 24 * 3600 * 1000)
      }
    })
  ]);

  // Events for activity feed
  await prisma.orderEvent.createMany({
    data: [
      { orderId: orders[0].id, eventType: 'DELIVERED', details: { by: 'John D.' } },
      { orderId: orders[1].id, eventType: 'POD_UPLOADED', details: { by: 'Sarah M.' } },
      { orderId: orders[2].id, eventType: 'ALERT_DELAY', details: { hours: 2 } }
    ]
  });

  console.log('✅ Seed complete');
}

main().finally(() => prisma.$disconnect());
