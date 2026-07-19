import { CustomerRepository } from "./customer.repository";
import { CustomerSignupDto, CustomerLoginDto, AddressDto } from "./customer.types";
import { hashPassword, comparePassword } from "@/utils/password";
import { getDefaultStore } from "@/lib/store";

export class CustomerService {
  private repository = new CustomerRepository();

  async signup(data: CustomerSignupDto) {
    const store = await getDefaultStore();

    const existing = await this.repository.findByPhone(store.id, data.phone);

    if (existing) {
      throw new Error("An account with this phone number already exists.");
    }

    const hashedPassword = await hashPassword(data.password);

    const customer = await this.repository.create({
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: hashedPassword,
      storeId: store.id,
    });

    const { password, ...safeCustomer } = customer;
    return safeCustomer;
  }

  async login(data: CustomerLoginDto) {
    const store = await getDefaultStore();

    const customer = await this.repository.findByPhone(store.id, data.phone);

    if (!customer) {
      throw new Error("Invalid phone number or password.");
    }

    const valid = await comparePassword(data.password, customer.password);

    if (!valid) {
      throw new Error("Invalid phone number or password.");
    }

    const { password, ...safeCustomer } = customer;
    return safeCustomer;
  }

  async getAll(storeId: string, query: any) {
    return this.repository.findAll(storeId, {
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 10,
      search: query.search,
    });
  }

  async getDetail(id: string, storeId: string) {
    const customer = await this.repository.findDetail(id, storeId);

    if (!customer) {
      throw new Error("Customer not found.");
    }

    const { password, ...safeCustomer } = customer;
    return safeCustomer;
  }

  async listAddresses(customerId: string) {
    return this.repository.listAddresses(customerId);
  }

  async addAddress(customerId: string, data: AddressDto) {
    return this.repository.createAddress(customerId, data);
  }

  async updateAddress(
    addressId: string,
    customerId: string,
    data: Partial<AddressDto>
  ) {
    const existing = await this.repository.findAddress(addressId, customerId);

    if (!existing) {
      throw new Error("Address not found.");
    }

    return this.repository.updateAddress(addressId, customerId, data);
  }

  async deleteAddress(addressId: string, customerId: string) {
    const existing = await this.repository.findAddress(addressId, customerId);

    if (!existing) {
      throw new Error("Address not found.");
    }

    return this.repository.deleteAddress(addressId);
  }
}
