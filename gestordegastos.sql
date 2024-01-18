-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: gestordegastos
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `amount` int NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT 'expense',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `document` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (85,'Pago de salarios',455000,'','2023-07-04 16:05:11','other','Pago de salario al personal de Okiwa S.A.',NULL),(86,'Pago de servicios basicos',325000,'','2023-07-04 16:05:59','subscriptions','Pago de energia electrica, agua, etc.',NULL),(87,'Pago de WIFI',245000,'','2023-07-04 17:26:10','Efectivo','Pago de servicios',NULL),(88,'Pago por servicios',245000,'','2023-07-04 17:27:47','Transferencia','Pago por servicios',NULL),(89,'Testing',245,'','2023-07-06 17:38:30','Tarjeta','Testing',NULL),(90,'Testing',245,'','2023-07-06 17:38:56','Efectivo','Testing',NULL),(91,'Testing',245,'','2023-07-06 17:40:11','Transferencia','Testing',NULL),(92,'Testing',2345,'','2023-07-06 17:40:25','Efectivo','Testing',NULL),(93,'Testing',234,'','2023-07-06 17:40:39','Transferencia','Testing',NULL),(94,'Testing',235,'','2023-07-06 17:40:50','Efectivo','Testing',NULL),(95,'Testing',234,'','2023-07-06 17:41:09','Efectivo','Testing',NULL);
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense_files`
--

DROP TABLE IF EXISTS `expense_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense_files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `path` varchar(150) DEFAULT NULL,
  `transaction` int DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_file_to_transaction_idx` (`transaction`),
  CONSTRAINT `fk_file_to_transaction` FOREIGN KEY (`transaction`) REFERENCES `expense` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense_files`
--

LOCK TABLES `expense_files` WRITE;
/*!40000 ALTER TABLE `expense_files` DISABLE KEYS */;
INSERT INTO `expense_files` VALUES (18,'doc_radiactividad-logo.jpg','./public/image/jpeg/4-6-2023/doc_radiactividad-logo.jpg',85,'image/jpeg'),(19,'doc_autotecnica.jpg','./public/image/jpeg/4-6-2023/doc_autotecnica.jpg',86,'image/jpeg'),(20,'doc_Factura Tigo.jpg','./public/image/jpeg/4-6-2023/doc_Factura Tigo.jpg',87,'image/jpeg'),(21,'doc_WhatsApp Image 2023-07-04 at 12.17.32.jpeg','./public/image/jpeg/4-6-2023/doc_WhatsApp Image 2023-07-04 at 12.17.32.jpeg',88,'image/jpeg');
/*!40000 ALTER TABLE `expense_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `income`
--

DROP TABLE IF EXISTS `income`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `income` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `amount` int NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT 'income',
  `date` varchar(150) NOT NULL,
  `category` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `document` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `income`
--

LOCK TABLES `income` WRITE;
/*!40000 ALTER TABLE `income` DISABLE KEYS */;
INSERT INTO `income` VALUES (37,'Cobro por POS',575000,'','2023-07-04','bank','Cobro de salario correspondiente por servicios informaticos',NULL),(39,'Venta de celulares',125500,'','2023-07-04','investments','Compra y Venta de telefonos moviles',NULL),(43,'Test',234,'','Tue Jul 04 2023 00:00:00 GMT-0400 (hora estándar de Paraguay)','freelancing','Test',NULL),(44,'Test',345,'','Tue Jul 04 2023 00:00:00 GMT-0400 (hora estándar de Paraguay)','salary','Test',NULL),(45,'Test',344,'','Tue Jul 04 2023 00:00:00 GMT-0400 (hora estándar de Paraguay)','freelancing','Test',NULL),(46,'Test',456,'','Tue Jul 04 2023 00:00:00 GMT-0400 (hora estándar de Paraguay)','bank','Test',NULL),(47,'Test',345,'','Wed Jul 05 2023 00:00:00 GMT-0400 (hora estándar de Paraguay)','investments','Test',NULL),(48,'Testing',3443,'','Tue Jul 04 2023 00:00:00 GMT-0400 (hora estándar de Paraguay)','freelancing','',NULL),(49,'Testando',234,'','Tue Jul 04 2023 00:00:00 GMT-0400 (hora estándar de Paraguay)','freelancing','',NULL),(50,'Testando',34523,'','Tue Jul 04 2023 00:00:00 GMT-0400 (hora estándar de Paraguay)','bank','',NULL),(51,'Testando',23423,'','Tue Jul 04 2023 00:00:00 GMT-0400 (hora estándar de Paraguay)','investments','',NULL);
/*!40000 ALTER TABLE `income` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `income_files`
--

DROP TABLE IF EXISTS `income_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `income_files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `path` varchar(150) DEFAULT NULL,
  `transaction` int DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `income_files`
--

LOCK TABLES `income_files` WRITE;
/*!40000 ALTER TABLE `income_files` DISABLE KEYS */;
INSERT INTO `income_files` VALUES (1,'/doc_radiactividad-logo.jpg','./public/income/30-5-2023/doc_radiactividad-logo.jpg',12,'income'),(2,'doc_radiactividad-logo.jpg','./public/income/30-5-2023/doc_radiactividad-logo.jpg',13,'income'),(3,'doc_autotecnica.jpg','./public/income/30-5-2023/doc_autotecnica.jpg',14,'income'),(4,'doc_POS.png','./public/income/30-5-2023/doc_POS.png',15,'income'),(5,'doc_Nelly.pdf','./public/income/30-5-2023/doc_Nelly.pdf',16,'income'),(6,'doc_autotecnica.jpg','./public/income/30-5-2023/doc_autotecnica.jpg',17,'income'),(7,'doc_autotecnica.jpg','./public/income/30-5-2023/doc_autotecnica.jpg',18,'income'),(8,'doc_Nelly.pdf','./public/income/30-5-2023/doc_Nelly.pdf',19,'income'),(9,'doc_WhatsApp Image 2023-06-08 at 12.25.06 (1).jpeg','./public/image/jpeg/4-6-2023/doc_WhatsApp Image 2023-06-08 at 12.25.06 (1).jpeg',26,'income'),(10,'doc_WhatsApp Image 2023-06-08 at 12.25.06.jpeg','./public/image/jpeg/4-6-2023/doc_WhatsApp Image 2023-06-08 at 12.25.06.jpeg',26,'income'),(11,'doc_radiactividad-logo.jpg','./public/image/jpeg/4-6-2023/doc_radiactividad-logo.jpg',27,'income'),(12,'doc_autotecnica.jpg','./public/image/jpeg/4-6-2023/doc_autotecnica.jpg',27,'income'),(13,'doc_autotecnica.jpg','./public/image/jpeg/4-6-2023/doc_autotecnica.jpg',28,'income'),(14,'doc_WhatsApp Image 2023-06-08 at 12.25.06 (1).jpeg','./public/image/jpeg/4-6-2023/doc_WhatsApp Image 2023-06-08 at 12.25.06 (1).jpeg',28,'income'),(15,'doc_radiactividad-logo.jpg','./public/image/jpeg/4-6-2023/doc_radiactividad-logo.jpg',29,'income'),(16,'doc_autotecnica.jpg','./public/image/jpeg/4-6-2023/doc_autotecnica.jpg',29,'income'),(17,'doc_autotecnica.jpg','./public/image/jpeg/4-6-2023/doc_autotecnica.jpg',30,'income'),(18,'doc_POS.png','./public/image/png/4-6-2023/doc_POS.png',30,'income'),(19,'doc_WhatsApp Image 2023-06-08 at 12.25.06.jpeg','./public/image/jpeg/4-6-2023/doc_WhatsApp Image 2023-06-08 at 12.25.06.jpeg',34,'image/jpeg'),(20,'doc_radiactividad-logo.jpg','./public/image/jpeg/4-6-2023/doc_radiactividad-logo.jpg',34,'image/jpeg'),(21,'doc_radiactividad-logo.jpg','./public/image/jpeg/4-6-2023/doc_radiactividad-logo.jpg',35,'image/jpeg'),(22,'doc_autotecnica.jpg','./public/image/jpeg/4-6-2023/doc_autotecnica.jpg',35,'image/jpeg'),(23,'doc_radiactividad-logo.jpg','./public/image/jpeg/4-6-2023/doc_radiactividad-logo.jpg',36,'image/jpeg'),(24,'doc_autotecnica.jpg','./public/image/jpeg/4-6-2023/doc_autotecnica.jpg',36,'image/jpeg'),(25,'doc_WhatsApp Image 2023-06-08 at 12.25.06.jpeg','./public/image/jpeg/4-6-2023/doc_WhatsApp Image 2023-06-08 at 12.25.06.jpeg',37,'image/jpeg'),(26,'doc_radiactividad-logo.jpg','./public/image/jpeg/4-6-2023/doc_radiactividad-logo.jpg',37,'image/jpeg'),(27,'doc_radiactividad-logo.jpg','./public/image/jpeg/4-6-2023/doc_radiactividad-logo.jpg',38,'image/jpeg'),(28,'doc_autotecnica.jpg','./public/image/jpeg/4-6-2023/doc_autotecnica.jpg',38,'image/jpeg'),(29,'doc_WhatsApp Image 2023-06-08 at 12.25.06 (1).jpeg','./public/image/jpeg/4-6-2023/doc_WhatsApp Image 2023-06-08 at 12.25.06 (1).jpeg',39,'image/jpeg'),(30,'doc_WhatsApp Image 2023-06-08 at 12.25.06.jpeg','./public/image/jpeg/4-6-2023/doc_WhatsApp Image 2023-06-08 at 12.25.06.jpeg',39,'image/jpeg');
/*!40000 ALTER TABLE `income_files` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-06 15:12:15
