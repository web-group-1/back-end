-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Course_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("authorId", "description", "id", "name") SELECT "authorId", "description", "id", "name" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
