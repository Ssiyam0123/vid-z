import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

export const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev';
const key = new TextEncoder().encode(JWT_SECRET);

export interface UserJwtPayload extends JWTPayload {
  userId: string;
  email: string;
}

export async function signJwt(payload: UserJwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

export async function verifyJwt(token: string): Promise<UserJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload as UserJwtPayload;
  } catch (error) {
    return null;
  }
}
