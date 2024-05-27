import prisma from "@/app/shared/lib/prisma";

export async function GET() {
  const res = await prisma.user.create({
    data: {},
  });

  return Response.json("User created!");
}
