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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `StaffId` int DEFAULT NULL,
  `ManagerId` int DEFAULT NULL,
  `Password` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `IsManager` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UserName_UNIQUE` (`UserName`),
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`UserName`),
  KEY `account_manager_fk_idx` (`ManagerId`),
  KEY `account_staff_fk` (`StaffId`),
  CONSTRAINT `account_manager_fk` FOREIGN KEY (`ManagerId`) REFERENCES `managers` (`Id`),
  CONSTRAINT `account_staff_fk` FOREIGN KEY (`StaffId`) REFERENCES `kitchenstaffs` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `billdetails`
--

DROP TABLE IF EXISTS `billdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billdetails` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `BillId` int NOT NULL,
  `MenuItemId` int NOT NULL,
  `StaffId` int NOT NULL,
  `BillPrice` double(10,2) unsigned NOT NULL,
  `State` int NOT NULL,
  `BeginTime` datetime DEFAULT NULL,
  `PredictedServedTime` datetime DEFAULT NULL,
  `RealServedTime` datetime DEFAULT NULL,
  `Duration` int unsigned DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `billDetail_bill_fk_idx` (`BillId`),
  KEY `billDetail_menuItem_fk_idx` (`MenuItemId`),
  KEY `billDetail_staff_fk_idx` (`StaffId`),
  CONSTRAINT `billDetail_bill_fk` FOREIGN KEY (`BillId`) REFERENCES `bills` (`Id`),
  CONSTRAINT `billDetail_staff_fk` FOREIGN KEY (`StaffId`) REFERENCES `kitchenstaffs` (`Id`),
  CONSTRAINT `billDetail_menuItem_fk` FOREIGN KEY (`MenuItemId`) REFERENCES `menuitems` (`Id`),
  CONSTRAINT `billdetails_chk_1` CHECK ((`BillPrice` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CustomerId` int DEFAULT NULL,
  `TableId` int NOT NULL,
  `OpenTime` datetime DEFAULT NULL,
  `CloseTime` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`CustomerId`,`TableId`),
  KEY `bill_table_fk_idx` (`TableId`),
  CONSTRAINT `bill_customer_fk` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`Id`),
  CONSTRAINT `bill_table_fk` FOREIGN KEY (`TableId`) REFERENCES `tables` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comboitems`
--

DROP TABLE IF EXISTS `comboitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comboitems` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `MenuItemsId` int NOT NULL,
  `CombosId` int NOT NULL,
  `Price` double(10,2) unsigned NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`MenuItemsId`,`CombosId`),
  KEY `comboItem_combo_fk_idx` (`CombosId`),
  CONSTRAINT `comboItem_combo_fk` FOREIGN KEY (`CombosId`) REFERENCES `combos` (`Id`),
  CONSTRAINT `comboItem_menuItem_fk` FOREIGN KEY (`MenuItemsId`) REFERENCES `menuitems` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `combos`
--

DROP TABLE IF EXISTS `combos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combos` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Price` double(10,2) unsigned NOT NULL,
  `Available` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name_UNIQUE` (`Name`),
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `PersonalId` int NOT NULL,
  `FirstName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `LastName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DateofVisit` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `PersonalId_UNIQUE` (`PersonalId`),
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`PersonalId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemtypes`
--

DROP TABLE IF EXISTS `itemtypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemtypes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ItemType` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Primary Key` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `kitchenstaffs`
--

DROP TABLE IF EXISTS `kitchenstaffs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kitchenstaffs` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `PersonalId` int NOT NULL,
  `FirstName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `LastName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `StaffTypeId` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `PersonalId_UNIQUE` (`PersonalId`),
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`PersonalId`),
  KEY `Foreign Key` (`StaffTypeId`),
  CONSTRAINT `staff_staffType_fk` FOREIGN KEY (`StaffTypeId`) REFERENCES `stafftypes` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `managerlog`
--

DROP TABLE IF EXISTS `managerItemLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managerItemLog` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ManagerId` int NOT NULL,
  `ItemId` int DEFAULT NULL,
  `ComboId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`ManagerId`,`ItemId`),
  KEY `managerItemLog_menuItem_fk_idx` (`ItemId`),
  CONSTRAINT `managerItemLog_manger_fk` FOREIGN KEY (`ManagerId`) REFERENCES `managers` (`Id`),
  CONSTRAINT `managerItemLog_menuItem_fk` FOREIGN KEY (`ItemId`) REFERENCES `menuitems` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `managerComboLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managerComboLog` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ManagerId` int NOT NULL,
  `ItemId` int DEFAULT NULL,
  `ComboId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Primary Key` (`Id`),
  KEY `Foreign Key` (`ManagerId`,`ComboId`),
  KEY `managerComboLog_combo_fk_idx` (`ComboId`),
  CONSTRAINT `managerComboLog_combo_fk` FOREIGN KEY (`ComboId`) REFERENCES `combos` (`Id`),
  CONSTRAINT `managerComboLog_manger_fk` FOREIGN KEY (`ManagerId`) REFERENCES `managers` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `managers`
--

DROP TABLE IF EXISTS `managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managers` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `PersonalId` int NOT NULL,
  `FirstName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `LastName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `PersonalId_UNIQUE` (`PersonalId`),
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`PersonalId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `menuitems`
--

DROP TABLE IF EXISTS `menuitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menuitems` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Price` double(10,2) unsigned NOT NULL,
  `DefaultDuration` int unsigned DEFAULT NULL,
  `Available` tinyint(1) NOT NULL,
  `ItemTypeId` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name_UNIQUE` (`Name`),
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`Name`),
  KEY `Foreign Key` (`ItemTypeId`),
  CONSTRAINT `menuItem_itemType_fk` FOREIGN KEY (`ItemTypeId`) REFERENCES `itemtypes` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stafftypes`
--

DROP TABLE IF EXISTS `stafftypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stafftypes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `StaffType` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Primary Key` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tables` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ServedState` tinyint(1) DEFAULT NULL,
  `PayState` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Code_UNIQUE` (`Code`),
  KEY `Primary Key` (`Id`),
  KEY `Unique Key` (`Code`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-16 17:55:54
