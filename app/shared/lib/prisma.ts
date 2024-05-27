import { PrismaClient } from "@prisma/client";

declare namespace NodeJS {
  interface Global {
    prisma: import("@prisma/client").PrismaClient;
  }
}

declare var global: NodeJS.Global;

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
