-- -----------------------------------------------------
-- Connection charset
-- -----------------------------------------------------
set names 'utf8';


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


-- -----------------------------------------------------
-- Procedure `fixflow_schema`.`advance_ticket_status`
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS `advance_ticket_status`;

DELIMITER $$ 
CREATE PROCEDURE `advance_ticket_status`(IN `a_ticket_id` BIGINT)
BEGIN
  DECLARE `curr_status` ENUM('PENDING', 'SOLVING', 'CLOSED');

  -- *Declaring the exception handler:
  DECLARE `_rollback` BOOL DEFAULT 0;
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
    SET `_rollback` = 1;

  -- *Starting a new transaction:
  START TRANSACTION;
  
  SELECT `status` INTO `curr_status` FROM `ticket` WHERE `id` = `a_ticket_id`;
  
  IF `curr_status` = 'PENDING' THEN
    -- *Solving the ticket:
    UPDATE `ticket` SET `status` = 'SOLVING' WHERE `id` = `a_ticket_id`;
  ELSEIF `curr_status` = 'SOLVING' THEN
    -- *Closing the ticket:
    UPDATE `ticket` SET `status` = 'CLOSED', `date_closed` = NOW() WHERE `id` = `a_ticket_id`;
  END IF;
  
  -- *Checking if some exception was raisaed:
  IF `_rollback` 
    -- *If it was:
    -- *Canceling the transaction:
    THEN ROLLBACK;
  ELSE 
    -- *If it wasn't:
    -- *Accepting the transaction:
    COMMIT;
  END IF;
END$$
DELIMITER ;


-- -----------------------------------------------------
-- Procedure `fixflow_schema`.`generate_reports`
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS `generate_reports`;

DELIMITER $$ 
CREATE PROCEDURE `generate_reports`()
BEGIN
  -- *Declaring the exception handler:
  DECLARE `_rollback` BOOL DEFAULT 0;
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
    SET `_rollback` = 1;

  -- *Starting a new transaction:
  START TRANSACTION;
  
  SELECT COUNT(*) 'tickets_qty' FROM `ticket`;
  
  SELECT COUNT(*) 'tickets_qty', `status` FROM `ticket` GROUP BY `status` ORDER BY `status` DESC;
  
  SELECT COUNT(*) 'feedbacks_qty' FROM `feedback`;

  SELECT COUNT(*) 'feedbacks_qty', `rating` FROM `feedback` GROUP BY `rating` ORDER BY `rating` DESC;

  SELECT AVG(timestampdiff(HOUR, `date_opened`, `date_closed`)) 'avg_response_hours' FROM `ticket` WHERE `date_closed` is not null;
  
  -- *Checking if some exception was raisaed:
  IF `_rollback` 
    -- *If it was:
    -- *Canceling the transaction:
    THEN ROLLBACK;
  ELSE 
    -- *If it wasn't:
    -- *Accepting the transaction:
    COMMIT;
  END IF;
END$$
DELIMITER ;
