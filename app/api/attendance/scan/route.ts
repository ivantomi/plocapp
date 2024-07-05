import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { rfid } = req.body;

    if (!rfid) {
      return res.status(400).json({ error: 'Missing RFID' });
    }

    try {
      // Find the user associated with the RFID
      const user = await prisma.user.findUnique({
        where: { rfid },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({message: `Hello ${user.name}`})

      // Find the active timeslot for the user
    //   const now = new Date();
    //   const activeTimeslot = await prisma.timeslot.findFirst({
    //     where: {
    //       startTime: { lte: now },
    //       endTime: { gte: now },
    //       classroom: {
    //         scannerId: user.id,
    //       },
    //     },
    //   });

    //   if (!activeTimeslot) {
    //     return res.status(404).json({ error: 'No active timeslot found' });
    //   }

    //   // Log the attendance
    //   const attendance = await prisma.attendance.create({
    //     data: {
    //       userId: user.id,
    //       timeslotId: activeTimeslot.id,
    //       timestamp: now,
    //     },
    //   });

    //   return res.status(201).json(attendance);
    } catch (error) {
      console.error('Error logging scan:', error);
      return res.status(500).json({ error: 'Error logging scan' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
