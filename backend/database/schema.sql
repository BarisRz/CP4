-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cp4
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `played`
--

DROP TABLE IF EXISTS `played`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `played` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `gameId` int NOT NULL,
  `liked` tinyint(1) DEFAULT '0',
  `rating` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `played_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE,
  CONSTRAINT `played_chk_1` CHECK (((`rating` >= 0) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `played`
--

/*!40000 ALTER TABLE `played` DISABLE KEYS */;
INSERT INTO `played` VALUES (39,1,4291,0,3),(79,1,3387,1,5),(80,1,39039,1,5),(81,1,58764,1,5),(83,1,58175,0,4.5),(84,1,22511,0,5),(85,1,10926,1,4.5),(86,1,58806,0,4),(87,1,537744,0,4),(89,1,12020,0,NULL),(90,1,5679,0,NULL),(91,1,2454,0,NULL),(92,1,1030,0,4),(93,1,13536,1,5),(94,1,28,0,2),(95,1,766,0,2.5),(96,1,5286,0,3.5),(97,1,2551,0,4.5),(115,1,850705,0,5),(118,1,10073,1,5),(119,1,3498,0,NULL),(124,1,4200,1,3),(125,1,56123,1,2),(131,1,3328,0,NULL),(132,21,850705,1,5),(133,21,121,0,3.5),(134,21,742771,1,5),(135,21,960873,0,2),(136,21,374507,1,5),(137,22,326243,1,5),(138,22,4639,0,4),(139,22,324997,1,5),(140,22,10073,0,4.5),(141,22,1571,0,4),(142,22,259801,1,5),(143,23,47137,1,5),(144,23,58501,0,4),(145,23,10142,0,3),(146,23,872778,0,3.5);
/*!40000 ALTER TABLE `played` ENABLE KEYS */;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `pseudo` (`pseudo`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (1,'admin','$argon2id$v=19$m=19456,t=2,p=1$SN+0T9MrL9jqgcQFGxkWkQ$umoq98Q/+yuyliBZZ9Wb7mVE0Kdz8TG+x8HXz9pE0IY','admin@admin.com',1),(21,'FightingGameLover','$argon2id$v=19$m=19456,t=2,p=1$deF/OZaOuY9wLZXpn6fKuA$jiNagAeyjRYY/sMjHOWXlMgCKKgiih8NQ0fx3VIAeQY','fighting@gmail.com',0),(22,'RPGLover','$argon2id$v=19$m=19456,t=2,p=1$lI9TImwpioy/zLuNHYpPIw$hHw9zPUegr7X1IcEAph+laGc1gezbTO9xzQBrdAJaBQ','rpg@gmail.com',0),(23,'FortniteKid','$argon2id$v=19$m=19456,t=2,p=1$BxGPlUKYdpAmt48sh2KL3w$7tpudH6ye88vo6RV38P3jvS5saVO7P9m/oWr88ku2MI','fortnite@gmail.com',0);
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;

--
-- Dumping routines for database 'cp4'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-01 17:33:32
