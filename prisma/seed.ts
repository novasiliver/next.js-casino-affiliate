import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create default admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@primebet.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });

  // Create default template
  const template1 = await prisma.template.upsert({
    where: { slug: 'template1' },
    update: {
      category: 'Casino Review Page Template',
    },
    create: {
      name: 'Template 1',
      slug: 'template1',
      component: 'ReviewTemplate1',
      category: 'Casino Review Page Template',
      description: 'Standard review template with pros/cons, banking, and game selection',
      isActive: true,
    },
  });

  console.log('Seeded admin user:', admin.email);
  console.log('Seeded template:', template1.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

