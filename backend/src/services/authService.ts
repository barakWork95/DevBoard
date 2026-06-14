import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import redis from "../db/redis";
import { create, findByEmail } from "../repositories/UserRepository";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const saltRounds = 10;

export async function register({ name, email, password }: RegisterData) {
  const existingUser = await findByEmail(email);
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return create({ name, email, password: hashedPassword });
}

export async function login(data: { email: string; password: string }) {
  const user = await findByEmail(data.email);
  if (!user) throw new Error("Invalid credentials");
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");
  const payload = { id: user.id, email: user.email, role: user.role };
  const secret = process.env.JWT_SECRET!;
  const accessToken = jwt.sign(payload, secret, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
}

export async function logout(refreshToken: string) {
  const decodedToken = jwt.decode(refreshToken) as JwtPayload;
  // remaining seconds to the expire date
  const ttl = decodedToken?.exp
    ? decodedToken.exp - Math.floor(Date.now() / 1000)
    : 604800;
  await redis.set(`blocklist:${refreshToken}`, refreshToken, "EX", ttl);
  return;
}

export async function refresh(refreshToken: string) {
  const isListed = await redis.exists(`blocklist:${refreshToken}`);
  if (isListed) throw new Error("Invalid token");
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    const { id, email, name, role } = decoded as {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    const payload = { id, email, name, role };
    const secret = process.env.JWT_SECRET!;
    const newAccessToken = jwt.sign(payload, secret, { expiresIn: "15m" });
    const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "7d",
    });
    return { newAccessToken, newRefreshToken };
  } catch {
    throw new Error("Invalid token");
  }
}
