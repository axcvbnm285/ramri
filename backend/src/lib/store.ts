import prisma from "@/lib/prisma";

export async function getDefaultStore() {
  const store = await prisma.store.findFirst({
    orderBy: { createdAt: "asc" },
  });

  if (!store) {
    throw new Error("Store not configured.");
  }

  return store;
}
