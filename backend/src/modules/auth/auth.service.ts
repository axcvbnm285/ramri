import { AuthRepository } from "./auth.repository";
import { SignupDto, LoginDto } from "./auth.types";
import { hashPassword, comparePassword } from "@/utils/password";

export class AuthService {
  private repository = new AuthRepository();

 async signup(data: SignupDto) {
  const existing = await this.repository.findUserByEmail(data.email);

  if (existing) {
    throw new Error("Email already exists.");
  }

  const hashedPassword = await hashPassword(data.password);

  const result = await this.repository.createOwnerWithStore(
    data,
    hashedPassword
  );

  const { password, ...safeUser } = result.user;

  return {
    user: safeUser,
    store: result.store,
  };
}

  async login(data: LoginDto) {
  const user = await this.repository.findUserWithStore(data.email);

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const valid = await comparePassword(
    data.password,
    user.password
  );

  if (!valid) {
    throw new Error("Invalid email or password.");
  }

  const { password, ...safeUser } = user;

  return safeUser;
}
}
