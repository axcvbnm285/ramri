import prisma from "@/lib/prisma";
import { SignupDto } from "./auth.types";

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async createOwnerWithStore(
    data: SignupDto,
    hashedPassword: string
  ) {
    return prisma.$transaction(async (tx) => {
      const store = await tx.store.create({
        data: {
          name: data.storeName,
          email: data.email,
        },
      });

      const user = await tx.user.create({
        data: {
          name: data.ownerName,
          email: data.email,
          password: hashedPassword,
          storeId: store.id,
        },
      });

      return { store, user };
    });
  }

  async findUserWithStore(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        store: true,
      },
    });
  }
}