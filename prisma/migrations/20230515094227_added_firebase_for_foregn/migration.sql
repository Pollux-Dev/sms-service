-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noContacts" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Sent" ("category", "id", "message", "noContacts", "status") SELECT "category", "id", "message", "noContacts", "status" FROM "Sent";
DROP TABLE "Sent";
ALTER TABLE "new_Sent" RENAME TO "Sent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
