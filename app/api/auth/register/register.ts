import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, username, email, password, role, rfid } = req.body;

    if (!name || !username || !email || !password || !role || !rfid) {
      return res.status(400).json({ error: 'Missing data' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          name,
          username,
          email,
          password: hashedPassword,
          role,
          rfid
        },
      });
      res.status(201).json({ message: 'User created!', user });
    } catch (error) {
      res.status(500).json({ error: 'Error during creation', details: error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} is not allowed`);
  }
}
