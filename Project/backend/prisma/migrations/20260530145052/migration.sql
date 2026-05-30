-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "day" INTEGER NOT NULL DEFAULT 1,
    "supplies" INTEGER NOT NULL DEFAULT 60,
    "safety" INTEGER NOT NULL DEFAULT 50,
    "population" INTEGER NOT NULL DEFAULT 70,
    "morale" INTEGER NOT NULL DEFAULT 65,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GameRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "endingId" TEXT NOT NULL,
    "endingName" TEXT NOT NULL,
    "isSuccess" BOOLEAN NOT NULL,
    "score" INTEGER NOT NULL,
    "roleId" TEXT NOT NULL,
    "playedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "GameSessionRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "day" INTEGER NOT NULL DEFAULT 1,
    "supplies" INTEGER NOT NULL DEFAULT 60,
    "safety" INTEGER NOT NULL DEFAULT 50,
    "population" INTEGER NOT NULL DEFAULT 70,
    "morale" INTEGER NOT NULL DEFAULT 65,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UnlockedEnding" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "endingId" TEXT NOT NULL,
    "unlockedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "LeaderboardEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "dayReached" INTEGER NOT NULL,
    "ending" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT,
    "totalPoint" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "id", "password", "profilePicture", "username") SELECT "createdAt", "email", "id", "password", "profilePicture", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "UnlockedEnding_userId_endingId_key" ON "UnlockedEnding"("userId", "endingId");
