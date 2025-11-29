import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { prisma } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export function createToken(user: AuthUser): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error instanceof Error ? error.message : error);
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function getAuthToken(request: NextRequest): string | null {
  const cookie = request.cookies.get('auth-token');
  return cookie?.value || null;
}

export function setAuthToken(response: NextResponse, token: string): void {
  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function clearAuthToken(response: NextResponse): void {
  response.cookies.delete('auth-token');
}

export async function getCurrentUser(request: NextRequest): Promise<AuthUser | null> {
  const token = getAuthToken(request);
  console.log('getCurrentUser - token exists:', !!token);
  if (!token) return null;

  const user = verifyToken(token);
  console.log('getCurrentUser - token verified:', !!user, user ? { id: user.id, email: user.email } : null);
  if (!user) return null;

  // Verify user still exists in database
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });
  console.log('getCurrentUser - dbUser found:', !!dbUser, dbUser ? { id: dbUser.id, email: dbUser.email } : null);

  if (!dbUser) return null;

  return {
    id: dbUser.id,
    email: dbUser.email,
    role: dbUser.role,
  };
}

