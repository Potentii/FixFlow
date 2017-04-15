-- -----------------------------------------------------
-- Schema fixflow_schema
-- -----------------------------------------------------
USE `fixflow_schema`;


-- -----------------------------------------------------
-- View `fixflow_schema`.`department_tickets`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `department_tickets`;

CREATE VIEW `department_tickets` AS
  SELECT
    `department`.`id` 'department_id',
    `ticket`.*
    FROM `ticket`
    INNER JOIN `category`
      ON `ticket`.`category_fk` = `category`.`id`
    INNER JOIN `department`
      ON `category`.`department_fk` = `department`.`id`;


-- -----------------------------------------------------
-- View `fixflow_schema`.`user_access`
-- -----------------------------------------------------
/*
DROP VIEW IF EXISTS `user_access`;

CREATE VIEW `user_access` AS
  SELECT
    `user`.`id` 'id',
    `user`.`username` 'username',
    `access`.`key` 'key'
    FROM `access`
    INNER JOIN `user`
      ON `access`.`user_fk` = `user`.`id`;
      */

