CREATE TABLE `utilisateur` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `pseudo` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `admin` BOOLEAN DEFAULT 0
);

CREATE TABLE `played` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NOT NULL,
  `gameId` INT NOT NULL,
  `liked` BOOLEAN DEFAULT 0,
  FOREIGN KEY (`userId`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE
);

ALTER TABLE `played` 
ADD COLUMN `rating` INT DEFAULT NULL 
CHECK (rating >= 1 AND rating <= 5);