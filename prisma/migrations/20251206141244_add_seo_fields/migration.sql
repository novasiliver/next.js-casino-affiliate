-- AlterTable
ALTER TABLE `article` ADD COLUMN `seoAuthor` VARCHAR(255) NULL,
    ADD COLUMN `seoCanonical` VARCHAR(500) NULL,
    ADD COLUMN `seoDescription` TEXT NULL,
    ADD COLUMN `seoKeywords` TEXT NULL,
    ADD COLUMN `seoRobots` VARCHAR(100) NULL DEFAULT 'index, follow',
    ADD COLUMN `seoTitle` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `casino` ADD COLUMN `seoAuthor` VARCHAR(255) NULL,
    ADD COLUMN `seoCanonical` VARCHAR(500) NULL,
    ADD COLUMN `seoDescription` TEXT NULL,
    ADD COLUMN `seoKeywords` TEXT NULL,
    ADD COLUMN `seoRobots` VARCHAR(100) NULL DEFAULT 'index, follow',
    ADD COLUMN `seoTitle` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `SeoSettings` (
    `id` VARCHAR(191) NOT NULL,
    `pageKey` VARCHAR(191) NOT NULL,
    `pageName` VARCHAR(191) NOT NULL,
    `seoTitle` VARCHAR(255) NULL,
    `seoDescription` TEXT NULL,
    `seoKeywords` TEXT NULL,
    `seoAuthor` VARCHAR(255) NULL,
    `seoPublisher` VARCHAR(255) NULL,
    `seoCanonical` VARCHAR(500) NULL,
    `seoRobots` VARCHAR(100) NULL DEFAULT 'index, follow',
    `ogImage` VARCHAR(500) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SeoSettings_pageKey_key`(`pageKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
