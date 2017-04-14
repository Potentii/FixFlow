-- -----------------------------------------------------
-- Schema fixflow_schema
-- -----------------------------------------------------
USE `fixflow_schema`;



-- -----------------------------------------------------
-- Procedure `fixflow_schema`.`clients_check_user_in_use`
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS `clients_check_user_in_use`;

DELIMITER $$ 
CREATE PROCEDURE `clients_check_user_in_use`(IN `a_user_fk` BIGINT)
BEGIN
  -- *Declaring variables:
  DECLARE `v_found` INT DEFAULT 0;  
  
  -- *Counting how many clients already references the same user:
  SELECT COUNT(*) INTO `v_found` FROM `client` where `user_fk` = `a_user_fk`;
  
  -- *Checking if some client does reference the same user:
  IF `v_found` > 0 THEN
	-- *If it does:
    -- *Throwing an exception:
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'FIXFLOW_ERR_USER_IN_USE';
  END IF;
END$$
DELIMITER ;


-- -----------------------------------------------------
-- Procedure `fixflow_schema`.`operators_check_user_in_use`
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS `operators_check_user_in_use`;

DELIMITER $$ 
CREATE PROCEDURE `operators_check_user_in_use`(IN `a_user_fk` BIGINT)
BEGIN
  -- *Declaring variables:
  DECLARE `v_found` INT DEFAULT 0;  
  
  -- *Counting how many operators already references the same user:
  SELECT COUNT(*) INTO `v_found` FROM `operator` where `user_fk` = `a_user_fk`;
  
  -- *Checking if some operator does reference the same user:
  IF `v_found` > 0 THEN
	-- *If it does:
    -- *Throwing an exception:
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'FIXFLOW_ERR_USER_IN_USE';
  END IF;
END$$
DELIMITER ;
