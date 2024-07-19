const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create a scanner
  const scanner = await prisma.scanner.create({
    data: {
      location: "Building A, Room 101",
    },
  });

  // Create a classroom
  const classroom = await prisma.classroom.create({
    data: {
      roomNumber: "101",
      scanner: {
        connect: { id: scanner.id },
      },
    },
  });

  // Create a user (instructor)
  const instructor = await prisma.user.create({
    data: {
      name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      password: "securepassword", // Make sure to hash this password in a real application
      role: "INSTRUCTOR",
      rfid: "1234567890",
    },
  });

  // Create a subject
  const subject = await prisma.subject.create({
    data: {
      name: "Introduction to Digital Arts",
      description: "A foundational course in digital arts",
      instructor: {
        connect: { id: instructor.id },
      },
    },
  });

  // Create a timeslot
  const timeslot = await prisma.timeslot.create({
    data: {
      subjectId: subject.id,
      classroomId: classroom.id,
      startTime: new Date("2024-09-01T10:00:00.000Z"),
      endTime: new Date("2024-09-01T12:00:00.000Z"),
    },
  });

  console.log("Initial data created successfully:", {
    scanner,
    classroom,
    instructor,
    subject,
    timeslot,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
