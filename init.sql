-- Ensure a clean slate (optional)
DROP TABLE IF EXISTS `permission`;
DROP TABLE IF EXISTS `hours_timing_mapping`;
DROP TABLE IF EXISTS `teacher`;
DROP TABLE IF EXISTS `admin`;
DROP TABLE IF EXISTS `users`;

-- 1. users table
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `roll` BIGINT NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- 2. admin table
CREATE TABLE `admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `position` VARCHAR(50) NOT NULL,
  `empId` BIGINT NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- 3. teacher table
CREATE TABLE `teacher` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `empId` BIGINT NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- 4. hours_timing_mapping table
CREATE TABLE `hours_timing_mapping` (
  `hour` INT NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  PRIMARY KEY (`hour`)
) ENGINE=InnoDB;

-- 5. permission table
CREATE TABLE `permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(50),
  `description` VARCHAR(500),
  `hours_from` INT NOT NULL,
  `hours_to` INT NOT NULL,
  `authorized` BOOLEAN NOT NULL DEFAULT FALSE,
  `authorized_by` INT,        -- admin who authorized
  `approved_by` INT,          -- teacher who approved
  PRIMARY KEY (`id`),
  INDEX `idx_user` (`user_id`),
  INDEX `idx_hours_from` (`hours_from`),
  INDEX `idx_hours_to` (`hours_to`),
  INDEX `idx_auth_by` (`authorized_by`),
  INDEX `idx_app_by` (`approved_by`),
  CONSTRAINT `fk_perm_user`
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
  CONSTRAINT `fk_perm_hours_from`
    FOREIGN KEY (`hours_from`) REFERENCES `hours_timing_mapping`(`hour`),
  CONSTRAINT `fk_perm_hours_to`
    FOREIGN KEY (`hours_to`)   REFERENCES `hours_timing_mapping`(`hour`),
  CONSTRAINT `fk_perm_authorized_by`
    FOREIGN KEY (`authorized_by`) REFERENCES `admin`(`id`),
  CONSTRAINT `fk_perm_approved_by`
    FOREIGN KEY (`approved_by`)   REFERENCES `teacher`(`id`)
) ENGINE=InnoDB;
insert into hours_timing_mapping values (1,'07:10:00','08:00:00');
insert into hours_timing_mapping values (2,'08:00:00','08:50:00');
insert into hours_timing_mapping values (3,'09:20:00','10:10:00');
insert into hours_timing_mapping values (4,'10:10:00','11:00:00');
insert into hours_timing_mapping values (5,'11:10:00','12:00:00');
insert into hours_timing_mapping values (6,'12:00:00','12:50:00');
insert into hours_timing_mapping values (7,'13:00:00','13:50:00');
insert into hours_timing_mapping values (8,'14:00:00','14:50:00');
insert into hours_timing_mapping values (9,'14:50:00','15:40:00');
insert into hours_timing_mapping values (10,'15:50:00','16:40:00');
insert into hours_timing_mapping values (11,'16:40:00','17:30:00');