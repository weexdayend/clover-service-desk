// src/app/api/auth/sign-in/route.ts

import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(JSON.stringify({ message: 'Username and password are required' }), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 200 });
    }

    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

    if (user.password !== hashedPassword) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: 'Sign-in successful', id: user.id_user, name: user.nama }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Something went wrong! Please try again.' }), { status: 500 });
  }
}
