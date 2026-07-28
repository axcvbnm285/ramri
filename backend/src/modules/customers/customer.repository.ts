import prisma from "@/lib/prisma";
import { AddressDto } from "./customer.types";

export class CustomerRepository {
  async findByPhone(phone: string) {
    return prisma.customer.findUnique({
      where: { phone },
    });
  }

  async findById(id: string, storeId: string) {
    return prisma.customer.findFirst({
      where: { id, orders: { some: { storeId } } },
    });
  }

  async findByPk(id: string) {
    return prisma.customer.findUnique({ where: { id } });
  }

  async setResetToken(customerId: string, hashedToken: string, expiresAt: Date) {
    return prisma.customer.update({
      where: { id: customerId },
      data: { resetToken: hashedToken, resetTokenExpiresAt: expiresAt },
    });
  }

  async findByResetToken(hashedToken: string) {
    return prisma.customer.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpiresAt: { gt: new Date() },
      },
    });
  }

  async updatePassword(customerId: string, hashedPassword: string) {
    return prisma.customer.update({
      where: { id: customerId },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiresAt: null,
      },
    });
  }

  async create(data: {
    name: string;
    phone: string;
    password: string;
    email?: string;
    storeId: string;
  }) {
    return prisma.customer.create({ data });
  }

  async findAll(
    storeId: string,
    query: { page?: number; limit?: number; search?: string }
  ) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    // Customer accounts are platform-wide now, not owned by one store — the
    // Customer.storeId column only records whichever store's signup form
    // they used first (see customer.service.ts), which is useless for
    // scoping "my customers" since it's almost always the same one default
    // store for everyone. What a store owner actually means by "customer"
    // is someone who has bought from them, so scope by their Order history.
    const where: any = { orders: { some: { storeId } } };

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { phone: { contains: query.search, mode: "insensitive" } },
      ];
    }

    const [customers, total] = await prisma.$transaction([
      prisma.customer.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { orders: { where: { storeId } } } },
        },
      }),
      prisma.customer.count({ where }),
    ]);

    return {
      customers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findDetail(id: string, storeId: string) {
    return prisma.customer.findFirst({
      where: { id, orders: { some: { storeId } } },
      include: {
        addresses: true,
        // Only this store's own orders — a customer's history with other
        // sellers on the platform isn't this store owner's business.
        orders: {
          where: { storeId },
          orderBy: { createdAt: "desc" },
          include: { items: true },
        },
      },
    });
  }

  async listAddresses(customerId: string) {
    return prisma.address.findMany({
      where: { customerId },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
  }

  async findAddress(id: string, customerId: string) {
    return prisma.address.findFirst({
      where: { id, customerId },
    });
  }

  async createAddress(customerId: string, data: AddressDto) {
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { customerId },
        data: { isDefault: false },
      });
    }

    return prisma.address.create({
      data: { ...data, customerId },
    });
  }

  async updateAddress(
    id: string,
    customerId: string,
    data: Partial<AddressDto>
  ) {
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { customerId },
        data: { isDefault: false },
      });
    }

    return prisma.address.update({
      where: { id },
      data,
    });
  }

  async deleteAddress(id: string) {
    return prisma.address.delete({ where: { id } });
  }
}
