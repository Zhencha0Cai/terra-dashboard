-- CreateTable
CREATE TABLE `BalanceHistory` (
    `address` CHAR(44) NOT NULL,
    `prev_height` VARCHAR(255) NULL,
    `balance_history` JSON NULL,

    PRIMARY KEY (`address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
