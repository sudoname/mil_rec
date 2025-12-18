import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@ossg.lagos.gov.ng';
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'Change@123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'OSSG Administrator',
      role: 'admin',
    },
  });

  console.log(`✅ Admin user created: ${admin.email}`);

  // Create site settings
  const settings = [
    {
      key: 'governor_notice',
      value: 'Governor Babajide Sanwo-Olu urges Lagos youths to urgently register interest online for opportunities in the Nigerian Military.',
    },
    {
      key: 'department_name',
      value: 'Office of the Secretary to the State Government (OSSG) – Cabinet Office',
    },
    {
      key: 'office_address',
      value: 'Cabinet Office Block 1, The Secretariat, Alausa, Ikeja',
    },
    {
      key: 'recruitment_portal',
      value: 'recruitment.army.mil.ng',
    },
    {
      key: 'disclaimer',
      value: 'This portal is for Expression of Interest and information updates. Final recruitment is conducted via official military channels.',
    },
    {
      key: 'about_text',
      value: 'This initiative is supported by the Lagos State Government and coordinated through OSSG – Cabinet Office. This is an Expression of Interest (EOI) only. Screening dates and venues are published via official updates. No fees are charged by this portal.',
    },
    {
      key: 'next_steps_text',
      value: 'You may be contacted by OSSG/Cabinet Office representatives for guidance and screening updates.',
    },
    {
      key: 'homepage_banner',
      value: 'ATTENTION! ATTENTION!! ATTENTION!!!',
    },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('✅ Site settings created');

  // Create contact persons (stored as JSON in site settings)
  const contacts = JSON.stringify([
    { name: 'Ojedokun', phone: '08033442421', role: 'Coordinator' },
    { name: 'Aisha', phone: '09160041000', role: 'Assistant' },
    { name: 'Afolayan', phone: '09160042000', role: 'Support' },
  ]);

  await prisma.siteSetting.upsert({
    where: { key: 'contact_persons' },
    update: { value: contacts },
    create: { key: 'contact_persons', value: contacts },
  });

  console.log('✅ Contact persons created');

  // Create placeholder posters
  const posters = [
    {
      title: 'Lagos Youth Military Recruitment 2025',
      caption: 'Register your interest to join the Nigerian Military',
      imageUrl: '/posters/poster1.jpg',
      sortOrder: 1,
      active: true,
    },
    {
      title: 'Governor Sanwo-Olu Call to Action',
      caption: 'OSSG invites Lagos indigenes to express interest',
      imageUrl: '/posters/poster2.jpg',
      sortOrder: 2,
      active: true,
    },
    {
      title: 'Join Nigerian Armed Forces',
      caption: 'Opportunities in Army, Navy, Air Force & Cyber Defense',
      imageUrl: '/posters/poster3.jpg',
      sortOrder: 3,
      active: true,
    },
  ];

  for (const poster of posters) {
    await prisma.poster.create({
      data: poster,
    });
  }

  console.log('✅ Placeholder posters created');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
