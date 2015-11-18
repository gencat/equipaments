
set sql_safe_updates=0;

DROP TABLE IF EXISTS `equipaments`;

CREATE TABLE `equipaments` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nom` varchar(200) NOT NULL DEFAULT '',
  `adreca` varchar(500) DEFAULT NULL,
  `municipi` varchar(100) DEFAULT NULL,
  `cp` varchar(5) DEFAULT NULL,
  `comarca` varchar(50) DEFAULT NULL,
  `telefon` varchar(20) DEFAULT NULL,
  `longitud` decimal(10,9) DEFAULT NULL,
  `latitud` decimal(11,9) DEFAULT NULL,
  `categories` varchar(500) DEFAULT NULL,
  `Location` varchar(100) DEFAULT NULL,
  UNIQUE (`nom`),
  PRIMARY KEY (`id`)	
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


ALTER TABLE equipaments ADD FULLTEXT(nom, adreca, municipi, cp, comarca, telefon, categories);

LOAD DATA LOCAL INFILE '/tmp/data/Equipaments.csv'
INTO TABLE equipaments
CHARACTER SET UTF8
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(nom,adreca,municipi,cp,comarca,telefon,longitud,latitud,categories,Location);

