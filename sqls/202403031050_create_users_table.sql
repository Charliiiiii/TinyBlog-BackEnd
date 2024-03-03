CREATE TABLE `newblog`.`users`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NULL,
  `password` varchar(255) NULL,
  `phone` varchar(255) NOT NULL,
  `avatar` varchar(255) NULL,
  PRIMARY KEY (`id`)
);