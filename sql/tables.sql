-- -----------------------------------------------------
-- Connection charset
-- -----------------------------------------------------
set names 'utf8';


SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema fixflow_schema
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `fixflow_schema` ;

-- -----------------------------------------------------
-- Schema fixflow_schema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fixflow_schema` DEFAULT CHARACTER SET utf8 ;
USE `fixflow_schema` ;


-- -----------------------------------------------------
-- Table `fixflow_schema`.`department`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fixflow_schema`.`department` ;

CREATE TABLE IF NOT EXISTS `fixflow_schema`.`department` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(127) NOT NULL,
  `date` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fixflow_schema`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fixflow_schema`.`category` ;

CREATE TABLE IF NOT EXISTS `fixflow_schema`.`category` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(127) NOT NULL,
  `department_fk` BIGINT UNSIGNED NOT NULL,
  `date` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `department_fk_idx` (`department_fk` ASC),
  CONSTRAINT `category_department_fk`
    FOREIGN KEY (`department_fk`)
    REFERENCES `fixflow_schema`.`department` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fixflow_schema`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fixflow_schema`.`user` ;

CREATE TABLE IF NOT EXISTS `fixflow_schema`.`user` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(24) NOT NULL,
  `password` VARCHAR(24) NOT NULL,
  `date` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fixflow_schema`.`access`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fixflow_schema`.`access` ;

CREATE TABLE IF NOT EXISTS `fixflow_schema`.`access` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` VARCHAR(36) NOT NULL,
  `user_fk` BIGINT UNSIGNED NOT NULL,
  `date` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `user_fk_idx` (`user_fk` ASC),
  CONSTRAINT `access_user_fk`
    FOREIGN KEY (`user_fk`)
    REFERENCES `fixflow_schema`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fixflow_schema`.`client`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fixflow_schema`.`client` ;

CREATE TABLE IF NOT EXISTS `fixflow_schema`.`client` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `phone` VARCHAR(24) NULL,
  `email` VARCHAR(32) NULL,
  `user_fk` BIGINT UNSIGNED NOT NULL,
  `date` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `user_fk_idx` (`user_fk` ASC),
  CONSTRAINT `client_user_fk`
    FOREIGN KEY (`user_fk`)
    REFERENCES `fixflow_schema`.`user` (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fixflow_schema`.`operator`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fixflow_schema`.`operator` ;

CREATE TABLE IF NOT EXISTS `fixflow_schema`.`operator` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `department_fk` BIGINT UNSIGNED NOT NULL,
  `user_fk` BIGINT UNSIGNED NOT NULL,
  `date` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `department_fk_idx` (`department_fk` ASC),
  CONSTRAINT `operator_department_fk`
    FOREIGN KEY (`department_fk`)
    REFERENCES `fixflow_schema`.`department` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  UNIQUE INDEX `user_fk_idx` (`user_fk` ASC),
  CONSTRAINT `operator_user_fk`
    FOREIGN KEY (`user_fk`)
    REFERENCES `fixflow_schema`.`user` (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fixflow_schema`.`ticket`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fixflow_schema`.`ticket` ;

CREATE TABLE IF NOT EXISTS `fixflow_schema`.`ticket` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` TEXT NOT NULL,
  `urgency` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
  `description` TEXT NOT NULL,
  `status` ENUM('PENDING', 'SOLVING', 'CLOSED') NOT NULL DEFAULT 'PENDING',
  `date_opened` DATETIME NOT NULL DEFAULT NOW(),
  `date_closed` DATETIME NULL,
  `category_fk` BIGINT UNSIGNED NOT NULL,
  `client_fk` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `client_fk_idx` (`client_fk` ASC),
  INDEX `category_fk_idx` (`category_fk` ASC),
  CONSTRAINT `ticket_client_fk`
    FOREIGN KEY (`client_fk`)
    REFERENCES `fixflow_schema`.`client` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `ticket_category_fk`
    FOREIGN KEY (`category_fk`)
    REFERENCES `fixflow_schema`.`category` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fixflow_schema`.`checkpoint`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fixflow_schema`.`checkpoint` ;

CREATE TABLE IF NOT EXISTS `fixflow_schema`.`checkpoint` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `description` TEXT NULL,
  `date_started` DATETIME NOT NULL DEFAULT NOW(),
  `date_finished` DATETIME NULL,
  `ticket_fk` BIGINT UNSIGNED NOT NULL,
  `operator_fk` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `ticket_fk_idx` (`ticket_fk` ASC),
  INDEX `operator_fk_idx` (`operator_fk` ASC),
  CONSTRAINT `checkpoint_ticket_fk`
    FOREIGN KEY (`ticket_fk`)
    REFERENCES `fixflow_schema`.`ticket` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `checkpoint_operator_fk`
    FOREIGN KEY (`operator_fk`)
    REFERENCES `fixflow_schema`.`operator` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fixflow_schema`.`feedback`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fixflow_schema`.`feedback` ;

CREATE TABLE IF NOT EXISTS `fixflow_schema`.`feedback` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `message` TEXT NULL,
  `rating` TINYINT UNSIGNED NULL,
  `solved` TINYINT(1) NOT NULL,
  `ticket_fk` BIGINT UNSIGNED NOT NULL,
  `date` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `ticket_fk_idx` (`ticket_fk` ASC),
  CONSTRAINT `feedback_ticket_fk`
    FOREIGN KEY (`ticket_fk`)
    REFERENCES `fixflow_schema`.`ticket` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
