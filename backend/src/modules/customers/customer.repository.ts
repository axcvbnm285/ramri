import prisma from "@/lib/prisma";
import { AddressDto } from "./customer.types";

export class CustomerRepository {
  async findByPhone(storeId: string, phone: string) {
    return prisma.customer.findUnique({
      where: {
        storeId_phone: {
          storeId,
          phone,
        },
      },
    });
  }

  async findById(id: string, storeId: string) {
    return prisma.customer.findFirst({
      where: { id, storeId },
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

    const where: any = { storeId };

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
          _count: { select: { orders: true } },
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
      where: { id, storeId },
      include: {
        addresses: true,
        orders: {
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
