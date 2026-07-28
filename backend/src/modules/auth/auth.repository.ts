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
    return prisma.$transaction(
      async (tx) => {
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
      },
      { maxWait: 10000, timeout: 20000 }
    );
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

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async setResetToken(userId: string, hashedToken: string, expiresAt: Date) {
    return prisma.user.update({
      where: { id: userId },
      data: { resetToken: hashedToken, resetTokenExpiresAt: expiresAt },
    });
  }

  async findByResetToken(hashedToken: string) {
    return prisma.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpiresAt: { gt: new Date() },
      },
    });
  }

  async updatePassword(userId: string, hashedPassword: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiresAt: null,
      },
    });
  }
}