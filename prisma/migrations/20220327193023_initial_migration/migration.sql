-- CreateTable
CREATE TABLE `MmOverseerEpochStates` (
    `height` VARCHAR(255) NOT NULL,
    `deposit_rate` VARCHAR(255) NOT NULL,
    `prev_aterra_supply` VARCHAR(255) NOT NULL,
    `prev_exchange_rate` VARCHAR(255) NOT NULL,
    `prev_interest_buffer` VARCHAR(255) NOT NULL,
    `last_executed_height` BIGINT UNSIGNED NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`last_executed_height`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
