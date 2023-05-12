/*
  Warnings:

  - Added the required column `message` to the `OutBox` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OutBox" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "status" TEXT,
    CONSTRAINT "OutBox_id_fkey" FOREIGN KEY ("id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OutBox" ("id", "status") SELECT "id", "status" FROM "OutBox";
DROP TABLE "OutBox";
ALTER TABLE "new_OutBox" RENAME TO "OutBox";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
