import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/scan', async (req, res) => {
    const { rfid } = req.body;
    if (!rfid) {
        return res.status(400).json({ error: 'RFID is required' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { rfid } });
        if (user) {
            const now = new Date();
            const classroom = await prisma.classroom.findFirst({
                where: {
                    startTime: { lte: now },
                    endTime: { gte: now }
                }
            });

            if (classroom) {
                await prisma.attendance.create({
                    data: {
                        userId: user.id,
                        classroomId: classroom.id
                    }
                });
                return res.status(200).json({ message: `Attendance logged for user ${user.name}` });
            } else {
                return res.status(404).json({ message: 'No active classroom found' });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error querying database' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

export default router;
