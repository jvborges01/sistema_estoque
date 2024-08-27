-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sistema_estoque
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `material_hidraulico`
--

DROP TABLE IF EXISTS `material_hidraulico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_hidraulico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_item` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `qtd` varchar(4) COLLATE utf8mb4_general_ci NOT NULL,
  `data` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `hora` time NOT NULL,
  `local` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `rp` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `responsavel` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `obs` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_hidraulico`
--

LOCK TABLES `material_hidraulico` WRITE;
/*!40000 ALTER TABLE `material_hidraulico` DISABLE KEYS */;
INSERT INTO `material_hidraulico` VALUES (1,'ggd','a','2024-03-21','10:02:00','','','',''),(4,'','','2024-03-22','21:05:00','','','',''),(5,'','','2024-03-22','21:05:00','','','',''),(6,'','','2024-03-22','21:05:00','','','',''),(7,'ggd','','2024-03-21','10:02:00','','','',''),(8,'ggd','a','2024-03-21','10:02:00','','','',''),(9,'ggd','','2024-03-21','10:02:00','','','',''),(10,'ggd','a','2024-03-21','10:02:00','','','',''),(11,'ggd','','2024-03-21','10:02:00','','','',''),(12,'ggd','a','2024-03-21','10:02:00','','','',''),(13,'ggd','','2024-03-21','10:02:00','','','',''),(14,'ggd','a','2024-03-21','10:02:00','','','',''),(15,'ggd','','2024-03-21','10:02:00','','','',''),(16,'ggd','a','2024-03-21','10:02:00','','','',''),(17,'ggd','','2024-03-21','10:02:00','','','',''),(18,'ggd','a','2024-03-21','10:02:00','','','',''),(19,'ggd','','2024-03-21','10:02:00','','','',''),(20,'ggd','a','2024-03-21','10:02:00','','','',''),(21,'ggd','','2024-03-21','10:02:00','','','','');
/*!40000 ALTER TABLE `material_hidraulico` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-22  9:15:21
