/*
  Warnings:

  - You are about to drop the column `classroomId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Classroom` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Classroom` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Classroom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[scannerId]` on the table `Classroom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `timeslotId` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_subjectId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "classroomId",
ADD COLUMN     "timeslotId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "endTime",
DROP COLUMN "startTime",
DROP COLUMN "subjectId";

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Timeslot" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "classroomId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Timeslot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassroomToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassroomToSubject_AB_unique" ON "_ClassroomToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassroomToSubject_B_index" ON "_ClassroomToSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_scannerId_key" ON "Classroom"("scannerId");

-- AddForeignKey
ALTER TABLE "Timeslot" ADD CONSTRAINT "Timeslot_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timeslot" ADD CONSTRAINT "Timeslot_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_timeslotId_fkey" FOREIGN KEY ("timeslotId") REFERENCES "Timeslot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomToSubject" ADD CONSTRAINT "_ClassroomToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomToSubject" ADD CONSTRAINT "_ClassroomToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
