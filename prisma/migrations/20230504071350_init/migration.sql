-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sms" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_sms_key" ON "Account"("sms");
