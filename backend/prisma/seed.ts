// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.productCategory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  const electronics = await prisma.category.create({
    data: { name: "Electronics" },
  });

  const clothing = await prisma.category.create({
    data: { name: "Clothing" },
  });

  const books = await prisma.category.create({
    data: { name: "Books" },
  });

  // Create products and assign categories using `connect`
  const phone = await prisma.product.create({
    data: {
      name: "iPhone 14",
      price: 999,
      stockQuantity: 50,
      categories: {
        create: [{ category: { connect: { id: electronics.id } } }],
      },
    },
  });

  const tshirt = await prisma.product.create({
    data: {
      name: "Cool T-Shirt",
      price: 25,
      stockQuantity: 100,
      categories: {
        create: [{ category: { connect: { id: clothing.id } } }],
      },
    },
  });

  const novel = await prisma.product.create({
    data: {
      name: "Harry Potter",
      price: 15,
      stockQuantity: 75,
      categories: {
        create: [{ category: { connect: { id: books.id } } }],
      },
    },
  });

  console.log({ phone, tshirt, novel });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
