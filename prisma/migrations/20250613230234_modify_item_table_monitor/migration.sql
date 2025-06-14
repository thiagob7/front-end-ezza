/*
  Warnings:

  - You are about to drop the column `rtmp` on the `Monitor` table. All the data in the column will be lost.
  - Added the required column `rtsp` to the `Monitor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Monitor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "rtsp" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CONNECTING'
);
INSERT INTO "new_Monitor" ("id", "name", "status") SELECT "id", "name", "status" FROM "Monitor";
DROP TABLE "Monitor";
ALTER TABLE "new_Monitor" RENAME TO "Monitor";
CREATE UNIQUE INDEX "Monitor_id_key" ON "Monitor"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
