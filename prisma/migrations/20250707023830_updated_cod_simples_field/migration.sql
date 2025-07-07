/*
  Warnings:

  - Made the column `cod_simples` on table `clients` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "cod_simples" SET NOT NULL,
ALTER COLUMN "cod_simples" SET DATA TYPE TEXT;
