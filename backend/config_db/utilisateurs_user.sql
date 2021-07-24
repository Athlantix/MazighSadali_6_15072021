-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: utilisateurs
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `poste` varchar(60) DEFAULT NULL,
  `acces` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `onlyone` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Bertrand','Joseph','joseph@gmail.com','123','Comptable',2),(11,'Jean','Jacque','jacque@gmail.com','123','ingenieur',2),(15,'Michou','Daniel','daniel@gmail.com','123','2',2),(16,'Test','Test','Test@gmail.com','123','2',2),(17,'Dot','patrick','patrick@gmail.com','$2b$10$UF.zuFdNEMmLJ9GeApYeI.IKOjDRCfa3RhGex3ot4QKFK8kPjeadq','2',2),(18,'Dotce','patricko','patcerick@gmail.com','$2b$10$vdlOvFB4oPw1SmAOBEjHCeRIOSrdl7d1z46Gcl/pE3RNTbhhzWKci','2',2),(19,'Dotezce','patezricko','patcerezick@gmail.com','$2b$10$QL9g9LgsUdIJkdf4GFUdgOQHKcoifQw8obwvG7PPfAgQyVXO/LHTm','2',2),(26,'Gaillard','boby','boby@gmail.com','$2b$10$5o2IzmiH5xTuSLTHB6UKZubOfSxqIgTd/U6BTLsP6COTtiH9rahk.','2',2),(27,'Gilbert','Montanier','3922c2dc64679ad68b76b469cf417c8bd91bb802f2bfd7633db91ead3594e529','$2b$10$HBI280BwecElQslv3PblKuu8vZlQ.NYy7SVsQv8JgwXhuK.2UFfsy','2',2),(28,'Tok','Bill','801a980e0072f673b4462d9e6912e7ce1f22d20b4194c657f57ead1a454b7bfe','$2b$10$JRNRP60JmaaprX3KgA8mzOY7hcdaZ2ghZFOIAPhPC7tbaqxMV1I2K','2',2),(29,'Marion','Maulaire','5d815e346f3ffd0dd369cf55e2028b6a85224fe4c2467e3560303f742d179ea0','$2b$10$JP5VbrrfibjxLp1/WcMwFuRcvvra5WFeRniUqpAn.MuLd.QIvURRm','2',2),(30,'Marine','Celeste','d834c58717f0f9660c0f3547c5bb243cb5af9f7329400648bab40b816e0b0806','$2b$10$HnZVeVDhDtyFIGKnioydu.BX3ksQNvtt5xtbEgP8fjAmYQNC.e/li','2',2),(31,'Gayard','Giselle','6dcd433ae615f1ffdcb50ee582c83ba9a5503bab11b10abf0e473cf3d23fdf9e','$2b$10$wUd.bIi6T7ON3eDjONEgmO9il0kE4u1Td6/dEM/4uk.YH1qP3UoBS','2',2),(32,'Chico','Mat','3f60c572815e8f8f9337c47b3a58c09aa839e4a39dc6d5a5cc5a6638e6877afa','$2b$10$BIpUJpnUuqc08o5cPqHxb.kVoGTNpXyjNU935WK.qc9DWxc.aFarO','2',2),(33,'Franck','Rob','30576564fbc6b50354467653a7bf38a8ef64fb6046a67dfa3628bb95e8376793','$2b$10$uHIa549GwJ2x9SmOfKJIzuP0LH/9IoMgoRTbJ3Mjx1OX0HqvO2rpC','2',2),(34,'bobbb','tessst','8aa6bc97b2fc7dd14afb5c98d26b21222ec56b47d804e70cc671b1887fec7fdc','$2b$10$zkFnhhuZYzwI3bN6GSG.yOi80NiQYjDTi3RSV.WM5H8XUXG1ADaYq','2',2),(35,'Maxwel','Henson','df1cdb88c615534635804ccfe07c140f0ea3f48b5b41328c1d98e0d21b853b5e','$2b$10$dBIQys66Yh39M0ap0VyKTeAXWKUPN4V51yC4YyWJaGhWM9bi.kVoW','ingenieur',2),(36,'Joffrey','Hernandez','2643a21209520aa0ee5d8efa6e347616c14c81f1ce0a481232b72e63186fb05d','$2b$10$mApzmqVwRn3IM44sKZZPzOnG53XKkwqqeCI/3Tb7r1tFtQ6/NLR6W','developpeur',2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-22 20:19:29
