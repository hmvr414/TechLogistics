-- MySQL dump 10.13  Distrib 8.0.41, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: guia4
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `Productox`
--

DROP TABLE IF EXISTS `Productox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Productox` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` decimal(15,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Productox`
--

LOCK TABLES `Productox` WRITE;
/*!40000 ALTER TABLE `Productox` DISABLE KEYS */;
INSERT INTO `Productox` VALUES (1,'Silla gamer','Silla gamer GRX',20000.00,5,'');
/*!40000 ALTER TABLE `Productox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `cliente_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`cliente_id`,`producto_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`cliente_id`),
  CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (1,1,1);
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `cliente_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `direccion` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`cliente_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `idx_clientes_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Juan Pérez','Calle sur 123','5551234567','juan@example.com','juanpe','123456'),(5,'María García','','','maria@test.com','mariaga','123456');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallepedido`
--

DROP TABLE IF EXISTS `detallepedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallepedido` (
  `detalle_id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`detalle_id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `detallepedido_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`),
  CONSTRAINT `detallepedido_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallepedido`
--

LOCK TABLES `detallepedido` WRITE;
/*!40000 ALTER TABLE `detallepedido` DISABLE KEYS */;
INSERT INTO `detallepedido` VALUES (1,1,1,2,1200.00),(2,1,2,1,25.50),(3,2,1,2,1200.00),(4,2,2,1,25.50),(5,3,1,2,1200.00),(6,3,2,1,25.50),(7,4,1,2,1200.00),(8,4,2,1,25.50),(9,5,1,1,1200.00),(10,5,2,3,25.50),(11,5,3,2,1200.00),(12,7,1,1,1200.00),(13,7,2,2,25.50),(14,8,1,1,1200.00),(15,8,2,2,25.50),(16,9,1,1,1200.00),(17,9,2,2,25.50),(18,10,1,1,1200.00),(19,10,8,1,1200.00),(20,11,2,1,25.50),(21,11,3,1,1200.00),(22,12,3,1,1200.00),(23,12,4,1,25.50),(24,13,5,1,1200.00),(25,13,6,1,25.50),(26,14,3,1,1200.00),(27,14,8,1,1200.00);
/*!40000 ALTER TABLE `detallepedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envios`
--

DROP TABLE IF EXISTS `envios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envios` (
  `envio_id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int NOT NULL,
  `transportista_id` int NOT NULL,
  `ruta_id` int NOT NULL,
  `estado_id` int NOT NULL,
  `fecha_inicio` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_estimada_entrega` datetime DEFAULT NULL,
  `fecha_real_entrega` datetime DEFAULT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`envio_id`),
  KEY `idx_envios_estado` (`estado_id`),
  KEY `idx_envios_transportista` (`transportista_id`),
  KEY `envios_ibfk_1` (`pedido_id`),
  KEY `envios_ibfk_3` (`ruta_id`),
  CONSTRAINT `envios_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`),
  CONSTRAINT `envios_ibfk_2` FOREIGN KEY (`transportista_id`) REFERENCES `transportistas` (`transportista_id`),
  CONSTRAINT `envios_ibfk_3` FOREIGN KEY (`ruta_id`) REFERENCES `rutas` (`ruta_id`),
  CONSTRAINT `envios_ibfk_4` FOREIGN KEY (`estado_id`) REFERENCES `estadosenvio` (`estado_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envios`
--

LOCK TABLES `envios` WRITE;
/*!40000 ALTER TABLE `envios` DISABLE KEYS */;
INSERT INTO `envios` VALUES (1,3,1,1,1,'2025-03-31 12:11:23','2025-03-31 19:11:23',NULL,'direccion 1'),(2,4,1,1,1,'2025-03-31 12:15:10','2025-03-31 19:15:10',NULL,'direccion 2'),(3,8,1,1,1,'2025-03-31 12:32:07','2025-03-31 19:32:07',NULL,'direccion 3'),(4,9,1,1,1,'2025-03-31 12:33:18','2025-03-31 19:33:18',NULL,'direccion 4'),(5,9,1,1,5,'2025-03-31 12:36:35','2025-03-31 19:36:35','2025-03-31 12:38:59','direccion 5'),(6,13,1,1,1,'2025-04-03 03:45:10','2025-04-03 10:45:10',NULL,'Calle 1 Carera 2'),(7,14,1,1,2,'2025-04-03 03:48:08','2025-04-03 10:48:08',NULL,'Carrera 1 Calle 2');
/*!40000 ALTER TABLE `envios` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `calcular_fecha_entrega` BEFORE INSERT ON `envios` FOR EACH ROW BEGIN
    DECLARE v_tiempo_estimado DECIMAL(10,2);
    
    SELECT tiempo_estimado INTO v_tiempo_estimado 
    FROM rutas 
    WHERE ruta_id = NEW.ruta_id;
    
    SET NEW.fecha_estimada_entrega = DATE_ADD(NEW.fecha_inicio, INTERVAL v_tiempo_estimado HOUR);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `estadosenvio`
--

DROP TABLE IF EXISTS `estadosenvio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estadosenvio` (
  `estado_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`estado_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadosenvio`
--

LOCK TABLES `estadosenvio` WRITE;
/*!40000 ALTER TABLE `estadosenvio` DISABLE KEYS */;
INSERT INTO `estadosenvio` VALUES (1,'Registrado','Pedido recibido y registrado en el sistema'),(2,'En preparación','Preparando el paquete para su envío'),(3,'En tránsito','Paquete en camino al destino'),(4,'En reparto','Paquete siendo entregado al cliente'),(5,'Entregado','Paquete entregado satisfactoriamente'),(6,'Devuelto','Paquete devuelto al remitente'),(7,'Cancelado','Envío cancelado');
/*!40000 ALTER TABLE `estadosenvio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `pedido_id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `fecha_pedido` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_entrega_estimada` date DEFAULT NULL,
  `total` decimal(12,2) NOT NULL,
  PRIMARY KEY (`pedido_id`),
  KEY `idx_pedidos_cliente` (`cliente_id`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`cliente_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,1,'2025-03-31 11:51:19',NULL,2425.50),(2,1,'2025-03-31 12:09:51',NULL,2425.50),(3,1,'2025-03-31 12:11:23',NULL,2425.50),(4,1,'2025-03-31 12:12:08',NULL,2425.50),(5,1,'2025-03-31 12:20:21',NULL,3676.50),(6,1,'2025-03-31 12:20:55',NULL,0.00),(7,5,'2025-03-31 12:30:42',NULL,1251.00),(8,5,'2025-03-31 12:32:07',NULL,1251.00),(9,5,'2025-03-31 12:33:18',NULL,1251.00),(10,1,'2025-04-03 02:53:40','2025-04-10',2400.00),(11,1,'2025-04-03 03:22:06','2025-04-10',1225.50),(12,1,'2025-04-03 03:25:12','2025-04-10',1225.50),(13,1,'2025-04-03 03:32:59','2025-04-10',1225.50),(14,1,'2025-04-03 03:48:08','2025-04-10',2400.00);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `producto_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `peso` decimal(10,2) NOT NULL,
  `dimensiones` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  PRIMARY KEY (`producto_id`),
  KEY `idx_productos_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Laptop Lenovo','Laptop de 15 pulgadas',2.50,'35x25x5 cm',1200.00),(2,'Mouse Inalámbrico\"','Mouse Bluetooth',0.20,'10x5x3 cm',25.50),(3,'Laptop Lenovo','Laptop de 15 pulgadas',2.50,'35x25x5 cm',1200.00),(4,'Mouse Inalámbrico','Mouse Bluetooth',0.20,'10x5x3 cm',25.50),(5,'Laptop Lenovo','Laptop de 15 pulgadas',2.50,'35x25x5 cm',1200.00),(6,'Mouse Inalámbrico','Mouse Bluetooth',0.20,'10x5x3 cm',25.50),(8,'Televisor LG','Televisor LG OLED',20.00,NULL,1200.00);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutas`
--

DROP TABLE IF EXISTS `rutas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rutas` (
  `ruta_id` int NOT NULL AUTO_INCREMENT,
  `origen` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `destino` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `distancia` decimal(10,2) NOT NULL,
  `tiempo_estimado` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ruta_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutas`
--

LOCK TABLES `rutas` WRITE;
/*!40000 ALTER TABLE `rutas` DISABLE KEYS */;
INSERT INTO `rutas` VALUES (1,'Madrid','Barcelona',620.00,6.50),(2,'Barcelona','Valencia',350.00,4.00),(3,'Madrid','Sevilla',540.00,5.50),(4,'Valencia','Bilbao',600.00,7.00),(5,'Ciudad de México','Guadalajara',540.00,6.00);
/*!40000 ALTER TABLE `rutas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguimientoenvios`
--

DROP TABLE IF EXISTS `seguimientoenvios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seguimientoenvios` (
  `seguimiento_id` int NOT NULL AUTO_INCREMENT,
  `envio_id` int NOT NULL,
  `ubicacion_actual` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado_id` int NOT NULL,
  `observaciones` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`seguimiento_id`),
  KEY `idx_seguimiento_envio` (`envio_id`),
  KEY `seguimientoenvios_ibfk_2` (`estado_id`),
  CONSTRAINT `seguimientoenvios_ibfk_1` FOREIGN KEY (`envio_id`) REFERENCES `envios` (`envio_id`),
  CONSTRAINT `seguimientoenvios_ibfk_2` FOREIGN KEY (`estado_id`) REFERENCES `estadosenvio` (`estado_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguimientoenvios`
--

LOCK TABLES `seguimientoenvios` WRITE;
/*!40000 ALTER TABLE `seguimientoenvios` DISABLE KEYS */;
INSERT INTO `seguimientoenvios` VALUES (1,5,'Centro logístico Madrid','2025-03-31 12:38:48',3,NULL);
/*!40000 ALTER TABLE `seguimientoenvios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transportistas`
--

DROP TABLE IF EXISTS `transportistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transportistas` (
  `transportista_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `contacto` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`transportista_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportistas`
--

LOCK TABLES `transportistas` WRITE;
/*!40000 ALTER TABLE `transportistas` DISABLE KEYS */;
INSERT INTO `transportistas` VALUES (1,'Transportes Rápidos SA','Juan Pérez','5551234567','contacto@transportesrapidos.com\r\n'),(2,'Mensajería Express','María Gómez','5557654321','info@mensajeriaexpress.com'),(3,'Envíos Seguros SL','Carlos Ruiz','5559876543','clientes@enviosseguros.com'),(6,'Envíos Express','Carlos López','5559876543','contacto@express.com');
/*!40000 ALTER TABLE `transportistas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vistadetallepedidos`
--

DROP TABLE IF EXISTS `vistadetallepedidos`;
/*!50001 DROP VIEW IF EXISTS `vistadetallepedidos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vistadetallepedidos` AS SELECT 
 1 AS `pedido_id`,
 1 AS `cliente`,
 1 AS `fecha_pedido`,
 1 AS `producto`,
 1 AS `cantidad`,
 1 AS `precio_unitario`,
 1 AS `subtotal`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vistaestadoenvios`
--

DROP TABLE IF EXISTS `vistaestadoenvios`;
/*!50001 DROP VIEW IF EXISTS `vistaestadoenvios`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vistaestadoenvios` AS SELECT 
 1 AS `envio_id`,
 1 AS `pedido_id`,
 1 AS `cliente`,
 1 AS `transportista`,
 1 AS `origen`,
 1 AS `destino`,
 1 AS `estado`,
 1 AS `fecha_inicio`,
 1 AS `fecha_estimada_entrega`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'guia4'
--

--
-- Dumping routines for database 'guia4'
--
/*!50003 DROP PROCEDURE IF EXISTS `RegistrarPedido` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RegistrarPedido`(IN `p_cliente_id` INT, IN `p_productos` JSON, OUT `p_pedido_id` INT)
BEGIN
    DECLARE v_total DECIMAL(12,2) DEFAULT 0;
    DECLARE i INT DEFAULT 0;
    DECLARE v_producto_id INT;
    DECLARE v_cantidad INT;
    DECLARE v_precio DECIMAL(10,2);
    
    -- Crear el pedido
    INSERT INTO Pedidos (cliente_id, total) VALUES (p_cliente_id, 0);
    SET p_pedido_id = LAST_INSERT_ID();
    
    -- Procesar cada producto
    WHILE i < JSON_LENGTH(p_productos) DO
        SET v_producto_id = JSON_EXTRACT(p_productos, CONCAT('$[', i, '].producto_id'));
        SET v_cantidad = JSON_EXTRACT(p_productos, CONCAT('$[', i, '].cantidad'));
        
        -- Obtener precio del producto
        SELECT precio INTO v_precio FROM Productos WHERE producto_id = v_producto_id;
        
        -- Insertar detalle
        INSERT INTO DetallePedido (pedido_id, producto_id, cantidad, precio_unitario)
        VALUES (p_pedido_id, v_producto_id, v_cantidad, v_precio);
        
        -- Acumular total
        SET v_total = v_total + (v_cantidad * v_precio);
        SET i = i + 1;
    END WHILE;
    
    -- Actualizar total del pedido
    UPDATE Pedidos SET total = v_total WHERE pedido_id = p_pedido_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vistadetallepedidos`
--

/*!50001 DROP VIEW IF EXISTS `vistadetallepedidos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vistadetallepedidos` AS select `p`.`pedido_id` AS `pedido_id`,`c`.`nombre` AS `cliente`,`p`.`fecha_pedido` AS `fecha_pedido`,`pr`.`nombre` AS `producto`,`dp`.`cantidad` AS `cantidad`,`dp`.`precio_unitario` AS `precio_unitario`,(`dp`.`cantidad` * `dp`.`precio_unitario`) AS `subtotal` from (((`pedidos` `p` join `clientes` `c` on((`p`.`cliente_id` = `c`.`cliente_id`))) join `detallepedido` `dp` on((`p`.`pedido_id` = `dp`.`pedido_id`))) join `productos` `pr` on((`dp`.`producto_id` = `pr`.`producto_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vistaestadoenvios`
--

/*!50001 DROP VIEW IF EXISTS `vistaestadoenvios`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vistaestadoenvios` AS select `e`.`envio_id` AS `envio_id`,`p`.`pedido_id` AS `pedido_id`,`c`.`nombre` AS `cliente`,`t`.`nombre` AS `transportista`,`r`.`origen` AS `origen`,`r`.`destino` AS `destino`,`es`.`nombre` AS `estado`,`e`.`fecha_inicio` AS `fecha_inicio`,`e`.`fecha_estimada_entrega` AS `fecha_estimada_entrega` from (((((`envios` `e` join `pedidos` `p` on((`e`.`pedido_id` = `p`.`pedido_id`))) join `clientes` `c` on((`p`.`cliente_id` = `c`.`cliente_id`))) join `transportistas` `t` on((`e`.`transportista_id` = `t`.`transportista_id`))) join `rutas` `r` on((`e`.`ruta_id` = `r`.`ruta_id`))) join `estadosenvio` `es` on((`e`.`estado_id` = `es`.`estado_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-03 23:58:42
