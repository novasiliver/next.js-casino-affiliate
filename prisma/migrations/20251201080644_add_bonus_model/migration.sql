-- CreateTable
CREATE TABLE `Bonus` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `casinoId` VARCHAR(191) NULL,
    `casinoSlug` VARCHAR(191) NULL,
    `casinoName` VARCHAR(191) NOT NULL,
    `casinoLogo` VARCHAR(191) NOT NULL,
    `casinoRating` DOUBLE NOT NULL,
    `amount` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `wagering` VARCHAR(191) NULL,
    `minDeposit` VARCHAR(191) NULL,
    `code` VARCHAR(191) NULL,
    `expiry` DATETIME(3) NULL,
    `isExclusive` BOOLEAN NOT NULL DEFAULT false,
    `isHotPick` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `provider` VARCHAR(191) NULL,
    `features` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Bonus_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
