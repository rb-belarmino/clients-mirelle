/*
  Warnings:

  - The `cod_simples` column on the `clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "cod_simples",
ADD COLUMN     "cod_simples" INTEGER;
