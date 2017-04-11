-- MySQL Workbench Forward Engineering

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
-- Table `fixflow_schema`.`client`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fixflow_schema`.`client` ;

CREATE TABLE IF NOT EXISTS `fixflow_schema`.`client` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `phone` VARCHAR(24) NULL,
  `email` VARCHAR(32) NULL,
  `date` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fixflow_schema`.`ticket`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fixflow_schema`.`ticket` ;

CREATE TABLE IF NOT EXISTS `fixflow_schema`.`ticket` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `urgency` ENUM('low', 'medium', 'high') NOT NULL,
  `category` VARCHAR(127) NOT NULL,
  `description` TEXT NOT NULL,
  `status` ENUM('pending', 'solving', 'closed') NOT NULL,
  `date_opened` DATETIME NOT NULL DEFAULT now(),
  `date_closed` DATETIME NULL,
  `client_fk` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `client_fk_idx` (`client_fk` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `ticket_client_fk`
    FOREIGN KEY (`client_fk`)
    REFERENCES `fixflow_schema`.`client` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fixflow_schema`.`operator`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fixflow_schema`.`operator` ;

CREATE TABLE IF NOT EXISTS `fixflow_schema`.`operator` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `department` VARCHAR(64) NOT NULL,
  `date` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fixflow_schema`.`checkpoint`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fixflow_schema`.`checkpoint` ;

CREATE TABLE IF NOT EXISTS `fixflow_schema`.`checkpoint` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `description` TEXT NULL,
  `date_started` DATETIME NOT NULL DEFAULT now(),
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
  `date` DATETIME NOT NULL DEFAULT now(),
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
