import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { comparePassword, createToken, setAuthToken } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = loginSchema.parse(body);

    // Trim whitespace
    const normalizedUsername = username.trim();

    console.log('Login attempt:', { username: normalizedUsername, passwordLength: password.length });

    // Try to find user by email first (exact match), then by name (exact match)
    // This ensures we get the correct user even if there are similar usernames
    let user = await prisma.user.findUnique({
      where: { email: normalizedUsername },
    });

    // If not found by email, try by name
    if (!user) {
      user = await prisma.user.findFirst({
        where: { name: normalizedUsername },
      });
    }

    console.log('User found:', user ? { id: user.id, email: user.email, name: user.name } : 'Not found');

    if (!user) {
      console.log('❌ User not found');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValid = await comparePassword(password, user.password);
    console.log('Password valid:', isValid);

    if (!isValid) {
      console.log('❌ Password invalid');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      success: true,
    });

    // Set the auth token cookie
    setAuthToken(response, token);
    
    // Log cookie to verify it's being set
    const cookieHeader = response.headers.get('Set-Cookie');
    console.log('✅ Login successful, cookie set:', cookieHeader ? 'YES' : 'NO');
    if (cookieHeader) {
      console.log('Cookie header:', cookieHeader.substring(0, 100) + '...');
    }
    
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}

