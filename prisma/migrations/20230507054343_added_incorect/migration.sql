-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "serviceProvider" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCorrect" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Account" ("category", "createdAt", "id", "phone", "serviceProvider") SELECT "category", "createdAt", "id", "phone", "serviceProvider" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
