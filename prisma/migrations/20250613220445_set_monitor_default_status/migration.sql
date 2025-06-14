-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Monitor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "rtmp" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CONNECTING'
);
INSERT INTO "new_Monitor" ("id", "name", "rtmp", "status") SELECT "id", "name", "rtmp", "status" FROM "Monitor";
DROP TABLE "Monitor";
ALTER TABLE "new_Monitor" RENAME TO "Monitor";
CREATE UNIQUE INDEX "Monitor_id_key" ON "Monitor"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
