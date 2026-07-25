import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function generateToken(userId: string) {
  return jwt.sign(
    {
      id: userId,
    },
    SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}

export function generatePlatformToken() {
  return jwt.sign(
    {
      role: "PLATFORM_ADMIN",
    },
    SECRET,
    {
      expiresIn: "7d",
    }
  );
}