-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bwc
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bwc` ;

-- -----------------------------------------------------
-- Schema bwc
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bwc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `bwc` ;

-- -----------------------------------------------------
-- Table `bwc`.`branch`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bwc`.`branch` ;

CREATE TABLE IF NOT EXISTS `bwc`.`branch` (
  `branch_id` INT NOT NULL AUTO_INCREMENT,
  `name` NVARCHAR(2048) NOT NULL,
  `branch_code` VARCHAR(45) NULL,
  `manager` NVARCHAR(2048) NULL,
  `line_channel` VARCHAR(2048) NULL,
  PRIMARY KEY (`branch_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bwc`.`zipcode`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bwc`.`zipcode` ;

CREATE TABLE IF NOT EXISTS `bwc`.`zipcode` (
  `zipcode` CHAR(5) NOT NULL,
  `branch_id` INT NOT NULL,
  PRIMARY KEY (`zipcode`),
  INDEX `fk_zipcode_branch_idx` (`branch_id` ASC) VISIBLE,
  CONSTRAINT `fk_zipcode_branch`
    FOREIGN KEY (`branch_id`)
    REFERENCES `bwc`.`branch` (`branch_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bwc`.`sale`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bwc`.`sale` ;

CREATE TABLE IF NOT EXISTS `bwc`.`sale` (
  `sale_id` INT NOT NULL,
  `name` NVARCHAR(2048) NOT NULL,
  `email` VARCHAR(2048) NULL,
  `sequence_no` INT NULL DEFAULT 0,
  `branch_id` INT NOT NULL,
  PRIMARY KEY (`sale_id`),
  INDEX `fk_sale_branch1_idx` (`branch_id` ASC) VISIBLE,
  CONSTRAINT `fk_sale_branch1`
    FOREIGN KEY (`branch_id`)
    REFERENCES `bwc`.`branch` (`branch_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bwc`.`customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bwc`.`customer` ;

CREATE TABLE IF NOT EXISTS `bwc`.`customer` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `name` NVARCHAR(2048) NOT NULL,
  `mobile_no` VARCHAR(45) NOT NULL,
  `zipcode` CHAR(5) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `model` VARCHAR(2048) NULL,
  `model_no` VARCHAR(2048) NULL,
  `finance_model` VARCHAR(2048) NULL,
  `finance_submodel` VARCHAR(2048) NULL,
  `finance_price` DECIMAL(19,4) NULL,
  `finance_down_percent` INT NULL,
  `finance_down_amount` DECIMAL(19,4) NULL,
  `finance_period` INT NULL,
  `finance_per_month` DECIMAL(19,4) NULL,
  `sale_id` INT NULL,
  `current_stage` ENUM("awaiting", "contacted", "reserved", "sold") NOT NULL DEFAULT 'awaiting',
  `contact_at` TIMESTAMP NULL,
  `contact_duration` INT NULL,
  `is_company` TINYINT NULL,
  PRIMARY KEY (`customer_id`),
  INDEX `fk_customer_zipcode1_idx` (`zipcode` ASC) INVISIBLE,
  INDEX `fk_customer_sale1_idx` (`sale_id` ASC) INVISIBLE,
  CONSTRAINT `fk_customer_zipcode1`
    FOREIGN KEY (`zipcode`)
    REFERENCES `bwc`.`zipcode` (`zipcode`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer_sale1`
    FOREIGN KEY (`sale_id`)
    REFERENCES `bwc`.`sale` (`sale_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bwc`.`notification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bwc`.`notification` ;

CREATE TABLE IF NOT EXISTS `bwc`.`notification` (
  `notification_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(2048) NULL,
  `recipient` VARCHAR(2048) NULL,
  `status` ENUM("success", "fail") NULL,
  `timestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`notification_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
-- begin attached script 'PutSales'
USE `bwc`;
DROP procedure IF EXISTS `PutSales`;

DELIMITER $$
USE `bwc`$$
CREATE PROCEDURE `PutSales` (
	IN customer_id INT
)
BEGIN
	-- Branch ID corresponding to the customer_id's zipcode
	DECLARE branch_id INT;
    -- Is this Customer a company? If yes we need to send it to branch_id 5 (Fleet)
    DECLARE is_company TINYINT;
    -- Previous Sale's ID corresponding to the branch_id in the customer table
    DECLARE previous_sale_id INT;
    -- Next Sale's ID corresponding to the sales table of that branch ID
    DECLARE next_sale_id INT;

	-- Find the branch_id of the current customer_id by joining zipcode
	SELECT z.branch_id
    INTO branch_id
	FROM customer c
	LEFT JOIN zipcode z
		ON c.zipcode=z.zipcode
    WHERE c.customer_id=customer_id;
    
    -- Find if this Customer is a company?
    SELECT c.is_company
    INTO is_company
    FROM customer c
    WHERE c.customer_id=customer_id;
    
    -- If this cusomter is a company, then make the branch_id 5 (Fleet)
    -- Note that this CANNOT update in the Table of customer because customer DOESN'T have branch_id!!!
    IF (is_company IS TRUE) THEN
		SET branch_id = 5;
    -- ##NOTE## IF the branch_id is SN1 , have 0.5 probability of being SN1 or SN2 
    -- branch_id is 3: SN1 , and 4: SN2
    ELSEIF (branch_id = 3) THEN
		SELECT IF(RAND()>0.5, 3, 4)
        INTO branch_id;
    END IF;
    
    -- SELECT branch_id;
    
    -- Find the Previous Sale's ID corresponding to the branch_id in the customer table
    SELECT c.sale_id
    INTO previous_sale_id
    FROM customer c
	LEFT OUTER JOIN sale s
		ON c.sale_id=s.sale_id
    WHERE s.branch_id = branch_id AND c.sale_id IS NOT NULL
    ORDER BY c.customer_id DESC 
    LIMIT 1;
    
    -- SELECT previous_sale_id;
    
    -- If no previous_sale_id, set next_sale_id as the first one from the sales table.
    -- If yes, set next_sale_id in round-robin manner
    IF previous_sale_id IS NULL 
    THEN
		SELECT s.sale_id
        INTO next_sale_id
        FROM sale s
        WHERE s.branch_id=branch_id
        LIMIT 1;
	ELSE
		SELECT MIN(s.sale_id)
        INTO next_sale_id
        FROM sale s
        WHERE s.branch_id=branch_id AND s.sale_id > previous_sale_id
        LIMIT 1;
        
        -- CAN STILL BE NULL if it's the last one!!!
        -- MAKE IT THE FIRST ONE
        IF next_sale_id IS NULL
        THEN
			SELECT s.sale_id
			INTO next_sale_id
			FROM sale s
			WHERE s.branch_id=branch_id
			LIMIT 1;
		END IF;
	END IF;
    
    
    -- Update next_sale_id into the customer's table
    UPDATE customer c
    SET
		sale_id = next_sale_id
	WHERE  c.customer_id=customer_id;
    
    -- Return the sales person
    SELECT 
		s.sale_id,
        s.name,
        s.email,
        s.sequence_no,
        s.branch_id,
        b.name AS branch_name,
        b.branch_code,
        b.manager AS branch_manager,
        b.line_channel AS branch_line_channel
    FROM sale s 
	LEFT OUTER JOIN branch b
		ON s.branch_id = b.branch_id
	WHERE s.sale_id = next_sale_id;
    
END$$

DELIMITER ;
-- end attached script 'PutSales'
