-- -----------------------------------------------------
-- Schema fixflow_schema
-- -----------------------------------------------------
USE `fixflow_schema`;


-- -----------------------------------------------------
-- Trigger `fixflow_schema`.`client_bi_check_user_in_use`
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS `client_bi_check_user_in_use`;

DELIMITER $$ 
CREATE TRIGGER `client_bi_check_user_in_use` BEFORE INSERT ON `client` FOR EACH ROW
BEGIN
  CALL `operators_check_user_in_use`(new.`user_fk`);
END$$
DELIMITER ;


-- -----------------------------------------------------
-- Trigger `fixflow_schema`.`client_bu_check_user_in_use`
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS `client_bu_check_user_in_use`;

DELIMITER $$ 
CREATE TRIGGER `client_bu_check_user_in_use` BEFORE UPDATE ON `client` FOR EACH ROW
BEGIN
  CALL `operators_check_user_in_use`(new.`user_fk`);
END$$
DELIMITER ;


-- -----------------------------------------------------
-- Trigger `fixflow_schema`.`operator_bi_check_user_in_use`
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS `operator_bi_check_user_in_use`;

DELIMITER $$ 
CREATE TRIGGER `operator_bi_check_user_in_use` BEFORE INSERT ON `operator` FOR EACH ROW
BEGIN
  CALL `clients_check_user_in_use`(new.`user_fk`);
END$$
DELIMITER ;


-- -----------------------------------------------------
-- Trigger `fixflow_schema`.`operator_bu_check_user_in_use`
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS `operator_bu_check_user_in_use`;

DELIMITER $$ 
CREATE TRIGGER `operator_bu_check_user_in_use` BEFORE UPDATE ON `operator` FOR EACH ROW
BEGIN
  CALL `clients_check_user_in_use`(new.`user_fk`);
END$$
DELIMITER ;