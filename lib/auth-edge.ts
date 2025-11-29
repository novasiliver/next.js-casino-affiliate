import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export async function getCurrentUserEdge(request: NextRequest): Promise<AuthUser | null> {
  const cookie = request.cookies.get('auth-token');
  const token = cookie?.value;
  
  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    return {
      id: payload.id as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch (error) {
    console.error('Token verification failed in edge:', error);
    return null;
  }
}

