-- CreateTable
CREATE TABLE "Livros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "editora" TEXT NOT NULL
);
