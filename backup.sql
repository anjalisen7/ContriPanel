-- MariaDB dump 10.19  Distrib 10.4.18-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: contribution
-- ------------------------------------------------------
-- Server version	10.4.18-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comittee`
--

DROP TABLE IF EXISTS `comittee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comittee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ComitteeName` varchar(50) NOT NULL,
  `Start_date` date NOT NULL,
  `End_date` date NOT NULL,
  `Total_Amount` int(50) NOT NULL,
  `Draw_Date` varchar(50) NOT NULL,
  `Members` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comittee`
--

LOCK TABLES `comittee` WRITE;
/*!40000 ALTER TABLE `comittee` DISABLE KEYS */;
INSERT INTO `comittee` VALUES (2,'Student Welfare','2025-06-01','2025-06-30',4000,'1st only','Nidhi,Nisha'),(3,'June  Commitee','2025-06-01','2025-06-30',50000,'1st only','hetal,Mahvish'),(4,'rfr','2025-05-31','2025-07-04',89800,'1st & 15th','Gurpreet,Celina'),(5,'S','2025-06-05','2025-07-04',333,'1st & 15th','Celina, Nisha, Mahvish'),(6,'unity crew','2025-06-01','2025-07-05',12000,'1st only','Gurpreet, Celina, Nisha, Mahvish');
/*!40000 ALTER TABLE `comittee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contri`
--

DROP TABLE IF EXISTS `contri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contri` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `ContiAmount` varchar(50) NOT NULL,
  `Uid` varchar(100) NOT NULL,
  `Date` date NOT NULL,
  `ComiteeName` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contri`
--

LOCK TABLES `contri` WRITE;
/*!40000 ALTER TABLE `contri` DISABLE KEYS */;
INSERT INTO `contri` VALUES (1,'Mahvish','1000','mem_6852b38c5f6534.32850246','2025-06-11','June  Commitee'),(2,'Mahvish','2000','mem_6852b38c5f6534.32850246','2025-06-06','June  Commitee'),(3,'Nisha','5000','mem_6852c5b5f08be5.69136381','2025-06-06','Student Welfare'),(4,'Nisha','8000','mem_6852c9624f6c89.46060926','2025-06-13','unity crew');
/*!40000 ALTER TABLE `contri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `Sno` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Role` varchar(50) NOT NULL,
  `DateTime` datetime NOT NULL,
  PRIMARY KEY (`Sno`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Admin@1234','Admin','2025-06-16 08:30:03'),(2,'Nisha','1234','Contributor','2025-06-16 14:43:23'),(3,'Mahvish','2345','Contributor','2025-06-16 14:46:13'),(4,'Gurpreet','1234','Contributor','2025-06-16 14:46:42'),(5,'Celina','2233','Contributor','2025-06-16 14:46:57'),(6,'KIKI','123','Contributor','2025-06-16 14:47:18'),(7,'hetal','htyt','Contributor','2025-06-16 14:57:41'),(8,'Nidhi','2233','Contributor','2025-06-17 11:15:42');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-18 20:37:07
