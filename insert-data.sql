-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: restaurant_system
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'aden',NULL,1,'aden',1),(2,'theodore',NULL,2,'theodore',1),(3,'todd',NULL,3,'todd',1),(4,'sophia',1,NULL,'sophi',0),(5,'elwood',2,NULL,'elwood',0),(6,'mike',3,NULL,'mike',0),(7,'jakob',4,NULL,'jakob',0),(8,'kristen',5,NULL,'kristen',0),(9,'serena',6,NULL,'serena',0),(10,'alexandra',7,NULL,'alexandra',0),(11,'dannielle',8,NULL,'dannielle',0),(12,'bryce',9,NULL,'bryce',0),(13,'vanesa',10,NULL,'vanesa',0);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `billdetails`
--

LOCK TABLES `billdetails` WRITE;
/*!40000 ALTER TABLE `billdetails` DISABLE KEYS */;
INSERT INTO `billdetails` VALUES (1,1,5,1,10.00,1,'2020-10-05 14:29:36','2020-10-05 14:49:36','2020-10-05 14:49:36',20),(2,1,6,2,5.00,1,'2020-10-05 15:36:29','2020-10-05 15:51:29','2020-10-05 15:51:29',15),(3,2,3,6,4.00,1,'2020-10-05 15:36:29','2020-10-05 15:41:29','2020-10-05 15:41:29',5),(4,3,11,3,12.00,1,'2020-10-05 17:31:29','2020-10-05 17:51:29','2020-10-05 17:51:29',20),(5,3,1,7,1.00,1,'2020-10-05 17:31:29','2020-10-05 17:33:29','2020-10-05 17:32:29',1);
/*!40000 ALTER TABLE `billdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (1,1,1,'2020-10-05 14:29:36','2020-10-05 14:58:36'),(2,2,5,'2020-10-05 15:36:29','2020-10-05 15:55:29'),(3,5,3,'2020-10-05 17:31:29','2020-10-05 17:51:29');
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comboitems`
--

LOCK TABLES `comboitems` WRITE;
/*!40000 ALTER TABLE `comboitems` DISABLE KEYS */;
INSERT INTO `comboitems` VALUES (1,2,1,1.80),(2,6,1,4.50),(3,19,1,3.15),(4,11,2,9.60),(5,14,2,0.80),(6,17,2,3.20),(7,15,3,9.60),(8,16,3,6.40),(9,4,4,4.80),(10,5,4,8.00),(11,7,4,4.80),(12,10,5,4.00),(13,12,5,6.40),(14,18,5,3.20);
/*!40000 ALTER TABLE `comboitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `combos`
--

LOCK TABLES `combos` WRITE;
/*!40000 ALTER TABLE `combos` DISABLE KEYS */;
INSERT INTO `combos` VALUES (1,'Combo 1',9.45,1),(2,'Combo 2',13.60,1),(3,'Combo 3',16.00,0),(4,'Combo 4',17.60,1),(5,'Combo 5',13.60,1);
/*!40000 ALTER TABLE `combos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,1,'Carol','Davison','2020-10-05 14:29:36'),(2,2,'Monique','Moss','2020-10-05 15:36:29'),(3,3,'Dave','Park',NULL),(4,4,'Luci','Raskin',NULL),(5,5,'Shantelle ','Harrell','2020-10-05 17:31:29');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `itemtypes`
--

LOCK TABLES `itemtypes` WRITE;
/*!40000 ALTER TABLE `itemtypes` DISABLE KEYS */;
INSERT INTO `itemtypes` VALUES (1,'Food'),(2,'Drink');
/*!40000 ALTER TABLE `itemtypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `kitchenstaffs`
--

LOCK TABLES `kitchenstaffs` WRITE;
/*!40000 ALTER TABLE `kitchenstaffs` DISABLE KEYS */;
INSERT INTO `kitchenstaffs` VALUES (1,1,'Sophia','Hollis',1),(2,2,'Elwood','Burris',1),(3,3,'Mike','Paul',1),(4,4,'Jakob','Proctor',1),(5,5,'Kirsten','Osborne',1),(6,6,'Serena','Tucker',2),(7,7,'Alexandra','Hills',2),(8,8,'Dannielle','Dale',2),(9,9,'Bryce','Corrigan',2),(10,10,'Vanesa','Almond',2);
/*!40000 ALTER TABLE `kitchenstaffs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `managerlog`
--

--
-- Dumping data for table `managers`
--

LOCK TABLES `managers` WRITE;
/*!40000 ALTER TABLE `managers` DISABLE KEYS */;
INSERT INTO `managers` VALUES (1,1,'Aden','Pope'),(2,2,'Theodore','Stamp'),(3,3,'Todd','O\'Brien');
/*!40000 ALTER TABLE `managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `menuitems`
--

LOCK TABLES `menuitems` WRITE;
/*!40000 ALTER TABLE `menuitems` DISABLE KEYS */;
INSERT INTO `menuitems` VALUES (1,'Coke',2.00,2,1,2),(2,'Pepsi',2.00,2,0,2),(3,'Boba tea',4.00,5,1,2),(4,'Egg and chilli pasta',6.00,15,1,1),(5,'Irish Stew',10.00,20,1,1),(6,'Sweet potato pie',5.00,15,1,1),(7,'Cobb salad',6.00,10,0,1),(8,'Sesame Chicken',9.00,15,1,1),(9,'Tuna Sandwich',4.00,5,1,1),(10,'Ice Cream Float',5.00,5,1,2),(11,'Salisbury Steak',12.00,20,1,1),(12,'Macaroni Salad',8.00,10,1,1),(13,'Egg Cream',4.00,5,0,2),(14,'Vietnamese Coffee',1.00,5,1,2),(15,'Crawfish Boudin',12.00,20,0,1),(16,'Oreilles de Crisse',8.00,10,0,1),(17,'Fried Green Tomatoes',4.00,10,1,1),(18,'Steamed Cabbage',4.00,10,1,1),(19,'Creamed Corn',3.50,5,1,1);
/*!40000 ALTER TABLE `menuitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `stafftypes`
--

LOCK TABLES `stafftypes` WRITE;
/*!40000 ALTER TABLE `stafftypes` DISABLE KEYS */;
INSERT INTO `stafftypes` VALUES (1,'Cook'),(2,'Bartender');
/*!40000 ALTER TABLE `stafftypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT INTO `tables` VALUES (1,'A1',0,0),(2,'A2',0,0),(3,'A3',0,0),(4,'A4',0,0),(5,'A5',0,0),(6,'B1',0,0),(7,'B2',0,0),(8,'B3',0,0),(9,'B4',0,0),(10,'B5',0,0);
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-16 17:56:13
