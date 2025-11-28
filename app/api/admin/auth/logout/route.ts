import { NextResponse } from 'next/server';
import { clearAuthToken } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });
  clearAuthToken(response);
  return response;
}

