/*
  Warnings:

  - Added the required column `category` to the `Sent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noContacts" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT,
    "category" TEXT NOT NULL
);
INSERT INTO "new_Sent" ("id", "message", "noContacts", "status") SELECT "id", "message", "noContacts", "status" FROM "Sent";
DROP TABLE "Sent";
ALTER TABLE "new_Sent" RENAME TO "Sent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
