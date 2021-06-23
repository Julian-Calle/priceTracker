CREATE DATABASE IF NOT EXISTS priceTracker CHARSET "utf8mb4" COLLATE "utf8mb4_spanish_ci";

USE priceTracker; 


CREATE TABLE `items` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `photo` varchar(50) NOT NULL DEFAULT 'default.svg',
  PRIMARY KEY (`id`)
) ;

CREATE TABLE `status` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `price` SMALLINT UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `itemId` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `status_items_fk1` (`itemId`),
  CONSTRAINT `status_items_fk1` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`)
) ;