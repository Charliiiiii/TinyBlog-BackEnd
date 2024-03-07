CREATE TABLE `newblog`.`articles`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `cover_url` varchar(255) NULL,
  `category` varchar(255) NULL,
  `uid` bigint NOT NULL,
  `description` varchar(255) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_uid` FOREIGN KEY (`uid`) REFERENCES `newblog`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);