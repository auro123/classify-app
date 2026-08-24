-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'completed',
ALTER COLUMN "result" DROP NOT NULL,
ALTER COLUMN "overallRisk" DROP NOT NULL;
