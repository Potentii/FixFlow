USE `fixflow_schema`;


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
		
